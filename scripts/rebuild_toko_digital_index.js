const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const TARGET_DIR = path.join(ROOT_DIR, 'fokuskonten-assets/toko-digital');
const ASSETS_REPO_INDEX = path.join(ROOT_DIR, 'fokuskonten-assets/toko_digital_assets_index.json');
const WEB_APP_INDEX = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/toko_digital_assets_index.json');

console.log('=== REBUILD ASSETS INDEX MANIFEST TOKO DIGITAL ===');
console.log('Source Dir:', TARGET_DIR);

const skuDirs = fs.readdirSync(TARGET_DIR)
  .filter(d => fs.statSync(path.join(TARGET_DIR, d)).isDirectory())
  .sort();

let totalVisualFiles = 0;
let totalSlides = 0;
let totalCovers = 0;
let totalAuxFiles = 0;

const assetsIndex = {
  metadata: {
    title: 'FokusKonten Asset CDN — Toko Digital Product Covers & Slides Index',
    version: '1.1.0',
    total_skus: skuDirs.length,
    total_visual_files: 0,
    total_covers: 0,
    total_slides: 0,
    total_all_files: 0,
    generated_at: new Date().toISOString(),
    cdn_base_urls: {
      tier1_jsdelivr: 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/toko-digital',
      tier2_raw_github: 'https://raw.githubusercontent.com/mcjobs-id/fokuskonten-assets/main/toko-digital',
      tier3_local: '/covers'
    }
  },
  by_sku: {}
};

for (const sku of skuDirs) {
  const fullDir = path.join(TARGET_DIR, sku);
  const files = fs.readdirSync(fullDir);

  // Hanya ambil WebP untuk preview visual mockup
  const webpFiles = files.filter(f => f.toLowerCase().endsWith('.webp'));
  
  // Cover utama adalah file webp yang mengandung kata 'cover'
  const coverFile = webpFiles.find(f => f.toLowerCase().includes('cover')) || `${sku}_cover.webp`;
  
  // Slide adalah file webp selain cover yang mengandung kata 'slide' (diurutkan alfabetik/numerik murni)
  const slideFiles = webpFiles
    .filter(f => f !== coverFile && f.toLowerCase().includes('slide'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Visual files murni (cover pertama, diikuti slide-slide)
  const visualFiles = [coverFile, ...slideFiles];

  // Berkas tambahan / artefak non-display (misal duplikat PNG/JPG lama atau file JSON data)
  const auxFiles = files.filter(f => !visualFiles.includes(f));

  totalCovers += 1;
  totalSlides += slideFiles.length;
  totalVisualFiles += visualFiles.length;
  totalAuxFiles += auxFiles.length;

  assetsIndex.by_sku[sku] = {
    sku,
    cover: coverFile,
    slides: slideFiles,
    files: visualFiles,
    auxiliary_files: auxFiles
  };
}

assetsIndex.metadata.total_visual_files = totalVisualFiles;
assetsIndex.metadata.total_covers = totalCovers;
assetsIndex.metadata.total_slides = totalSlides;
assetsIndex.metadata.total_all_files = totalVisualFiles + totalAuxFiles;

const jsonContent = JSON.stringify(assetsIndex, null, 2);
fs.writeFileSync(ASSETS_REPO_INDEX, jsonContent, 'utf8');
fs.writeFileSync(WEB_APP_INDEX, jsonContent, 'utf8');

console.log('--- RINGKASAN PEMBARUAN INDEKS ASET ---');
console.log(`Total SKU            : ${skuDirs.length}`);
console.log(`Total Visual WebP    : ${totalVisualFiles} (Covers: ${totalCovers}, Slides: ${totalSlides})`);
console.log(`Total Berkas Lengkap : ${totalVisualFiles + totalAuxFiles}`);
console.log(`Tersimpan di         : ${ASSETS_REPO_INDEX}`);
console.log(`Tersimpan di         : ${WEB_APP_INDEX}`);
