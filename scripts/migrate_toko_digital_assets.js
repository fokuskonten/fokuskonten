const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const DB_PATH = path.join(ROOT_DIR, 'Server-Fokuskonten/product_digital.db');
const COVERS_DIR = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/public/covers');
const TARGET_DIR = path.join(ROOT_DIR, 'fokuskonten-assets/toko-digital');
const ASSETS_REPO_INDEX = path.join(ROOT_DIR, 'fokuskonten-assets/toko_digital_assets_index.json');
const WEB_APP_INDEX = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/toko_digital_assets_index.json');

console.log('--- INISIALISASI MIGRASI ASET TOKO DIGITAL ---');
console.log('Source:', COVERS_DIR);
console.log('Target:', TARGET_DIR);

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  console.log('Direktori target berhasil dibuat:', TARGET_DIR);
}

// 1. Dapatkan daftar SKU aktif
const db = new DatabaseSync(DB_PATH, { readOnly: true });
const nonEbookRows = db.prepare("SELECT sku, title, category FROM digital_products WHERE is_published = 1 AND category NOT LIKE 'E-Book%'").all();
const jsonPath = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/digitalProducts.json');
const jsonProds = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const skuMap = new Map();
nonEbookRows.forEach(r => skuMap.set(r.sku.toUpperCase(), { sku: r.sku, title: r.title, category: r.category }));
jsonProds.forEach(r => {
  if (!skuMap.has(r.sku.toUpperCase())) {
    skuMap.set(r.sku.toUpperCase(), { sku: r.sku, title: r.title || r.name, category: r.category });
  }
});

console.log(`Total SKU aktif non-e-book: ${skuMap.size}`);

// Dapatkan daftar folder di public/covers
const coverFolders = fs.readdirSync(COVERS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);
const coverFolderMap = new Map();
coverFolders.forEach(name => coverFolderMap.set(name.toUpperCase(), name));

let copiedFolders = 0;
let copiedFiles = 0;
let copiedBytes = 0;

const assetsIndex = {
  metadata: {
    title: 'FokusKonten Asset CDN — Toko Digital Product Covers & Slides Index',
    version: '1.0.0',
    total_skus: 0,
    total_files: 0,
    generated_at: new Date().toISOString(),
    cdn_base_urls: {
      tier1_jsdelivr: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/toko-digital',
      tier2_raw_github: 'https://raw.githubusercontent.com/mcjobs-id/fokuskonten-assets/main/toko-digital',
      tier3_local: '/covers'
    }
  },
  by_sku: {}
};

for (const [skuUpper, info] of skuMap.entries()) {
  const folderName = coverFolderMap.get(skuUpper);
  if (!folderName) {
    console.warn(`[SKIP] Folder tidak ditemukan untuk SKU: ${skuUpper} (${info.title})`);
    continue;
  }

  const srcDir = path.join(COVERS_DIR, folderName);
  const destDir = path.join(TARGET_DIR, folderName);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  const webpFiles = files.filter(f => f.toLowerCase().endsWith('.webp'));
  const allFiles = files; // Salin seluruh file di folder

  // Sort files: cover first, then slides in order
  const sortedFiles = [...allFiles].sort((a, b) => {
    const aLow = a.toLowerCase();
    const bLow = b.toLowerCase();
    if (aLow.includes('cover')) return -1;
    if (bLow.includes('cover')) return 1;
    return aLow.localeCompare(bLow, undefined, { numeric: true });
  });

  const coverFile = sortedFiles.find(f => f.toLowerCase().includes('cover')) || sortedFiles[0] || '';
  const slideFiles = sortedFiles.filter(f => f !== coverFile);

  assetsIndex.by_sku[folderName] = {
    sku: folderName,
    cover: coverFile,
    slides: slideFiles,
    files: sortedFiles
  };

  for (const f of allFiles) {
    const srcFile = path.join(srcDir, f);
    const destFile = path.join(destDir, f);
    
    // Copy file if not exists or different size
    let shouldCopy = true;
    if (fs.existsSync(destFile)) {
      const srcStat = fs.statSync(srcFile);
      const destStat = fs.statSync(destFile);
      if (srcStat.size === destStat.size) {
        shouldCopy = false;
        copiedBytes += destStat.size;
        copiedFiles++;
      }
    }
    
    if (shouldCopy) {
      fs.copyFileSync(srcFile, destFile);
      const stat = fs.statSync(destFile);
      copiedBytes += stat.size;
      copiedFiles++;
    }
  }

  copiedFolders++;
}

assetsIndex.metadata.total_skus = copiedFolders;
assetsIndex.metadata.total_files = copiedFiles;

console.log(`\n=== HASIL SINKRONISASI ===`);
console.log(`Folder disinkronkan: ${copiedFolders}`);
console.log(`Total file: ${copiedFiles}`);
console.log(`Total ukuran: ${(copiedBytes / (1024 * 1024)).toFixed(2)} MB`);

// Simpan file indeks ke fokuskonten-assets dan ke Web/fokuskonte.my.id/content/apps
const indexContent = JSON.stringify(assetsIndex, null, 2);
fs.writeFileSync(ASSETS_REPO_INDEX, indexContent, 'utf8');
console.log('Indeks tersimpan di:', ASSETS_REPO_INDEX);

fs.writeFileSync(WEB_APP_INDEX, indexContent, 'utf8');
console.log('Indeks tersimpan di:', WEB_APP_INDEX);
