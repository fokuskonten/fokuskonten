const fs = require('fs');
const path = require('path');

const COVERS_DIR = path.resolve(__dirname, '../public/covers');
const KEPT_SKUS = new Set(['IDEB00']); // Fallback penting master bundle

console.log('=== PEMBERSIHAN PUBLIC COVERS UNTUK ZERO-BLOAT REPO ===');
console.log('Direktori Target:', COVERS_DIR);

if (!fs.existsSync(COVERS_DIR)) {
  console.log('Direktori covers tidak ditemukan.');
  process.exit(0);
}

const entries = fs.readdirSync(COVERS_DIR, { withFileTypes: true });
let deletedFolders = 0;
let deletedFiles = 0;
let freedBytes = 0;

for (const entry of entries) {
  const fullPath = path.join(COVERS_DIR, entry.name);
  if (entry.isDirectory()) {
    if (KEPT_SKUS.has(entry.name.toUpperCase())) {
      console.log(`[KEEP] Mempertahankan fallback penting: ${entry.name}`);
      continue;
    }

    // Hitung ukuran & file sebelum hapus
    const files = fs.readdirSync(fullPath);
    for (const f of files) {
      const fPath = path.join(fullPath, f);
      try {
        const stat = fs.statSync(fPath);
        freedBytes += stat.size;
        deletedFiles++;
      } catch (_) {}
    }

    fs.rmSync(fullPath, { recursive: true, force: true });
    deletedFolders++;
  } else {
    // File di root covers jika ada
    try {
      const stat = fs.statSync(fullPath);
      freedBytes += stat.size;
      fs.rmSync(fullPath, { force: true });
      deletedFiles++;
    } catch (_) {}
  }
}

// Bersihkan juga folder temporary non-produksi covers_*
const publicDir = path.resolve(__dirname, '../public');
const tempCoversDirs = ['covers_backup_dups', 'covers_stitch_ready', 'covers_stitch_ready_backup_dups'];
for (const tempDir of tempCoversDirs) {
  const p = path.join(publicDir, tempDir);
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`[CLEAN] Membersihkan folder temporary: public/${tempDir}`);
    } catch (_) {}
  }
}

console.log('\n=== HASIL PEMBERSIHAN PUBLIC COVERS ===');
console.log(`Folder Dihapus  : ${deletedFolders}`);
console.log(`Berkas Dihapus  : ${deletedFiles}`);
console.log(`Ruang Dibebaskan: ${(freedBytes / (1024 * 1024)).toFixed(2)} MB`);

// Ukuran akhir folder covers
let finalCoversBytes = 0;
let finalCoversCount = 0;
function countDir(d) {
  if (!fs.existsSync(d)) return;
  const items = fs.readdirSync(d, { withFileTypes: true });
  for (const it of items) {
    const fp = path.join(d, it.name);
    if (it.isDirectory()) countDir(fp);
    else {
      finalCoversBytes += fs.statSync(fp).size;
      finalCoversCount++;
    }
  }
}
countDir(COVERS_DIR);
console.log(`Sisa Berkas di public/covers: ${finalCoversCount} berkas (${(finalCoversBytes / 1024).toFixed(2)} KB)`);
