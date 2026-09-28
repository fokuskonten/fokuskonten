/**
 * purge_bloated_covers.js
 * 
 * Eksekusi Purifikasi Total Zero-Bloat:
 * Membersihkan 15.170 berkas duplikat di public/covers (1.49 GB)
 * dan 15.170 berkas duplikat di out/covers (1.49 GB),
 * membebaskan ~2.98 GB kapasitas SSD dan mengembalikan Next.js ke arsitektur CDN murni.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const WEB_DIR = path.resolve(__dirname, '..');
const PUBLIC_COVERS = path.join(WEB_DIR, 'public', 'covers');
const OUT_COVERS = path.join(WEB_DIR, 'out', 'covers');

function cleanDirectory(dirPath, keepDir = true) {
  let deletedFiles = 0;
  let deletedDirs = 0;
  let freedBytes = 0;

  if (!fs.existsSync(dirPath)) return { deletedFiles, deletedDirs, freedBytes };

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const sub = cleanDirectory(fullPath, false);
      deletedFiles += sub.deletedFiles;
      deletedDirs += sub.deletedDirs;
      freedBytes += sub.freedBytes;
      try {
        fs.rmdirSync(fullPath);
        deletedDirs++;
      } catch (_) {}
    } else {
      try {
        const stat = fs.statSync(fullPath);
        freedBytes += stat.size;
        fs.unlinkSync(fullPath);
        deletedFiles++;
      } catch (_) {}
    }
  }

  if (!keepDir) {
    try {
      fs.rmdirSync(dirPath);
      deletedDirs++;
    } catch (_) {}
  } else {
    // Buat .gitkeep agar folder tetap terstruktur
    const gitkeep = path.join(dirPath, '.gitkeep');
    fs.writeFileSync(gitkeep, '# Zero-Bloat: Aset disajikan via jsDelivr CDN & GitHub sekoci\n', 'utf8');
  }

  return { deletedFiles, deletedDirs, freedBytes };
}

console.log('=== MEMULAI PURIFIKASI TOTAL ZERO-BLOAT REPOSITORI WEB ===\n');

// 1. Bersihkan public/covers
console.log('1. Membersihkan public/covers...');
const resPublic = cleanDirectory(PUBLIC_COVERS, true);
console.log(`   Berkas dihapus : ${resPublic.deletedFiles.toLocaleString('id-ID')}`);
console.log(`   Folder dihapus : ${resPublic.deletedDirs.toLocaleString('id-ID')}`);
console.log(`   Ruang terbebas : ${(resPublic.freedBytes / (1024 * 1024)).toFixed(2)} MB\n`);

// 2. Bersihkan out/covers
console.log('2. Membersihkan out/covers...');
const resOut = cleanDirectory(OUT_COVERS, true);
console.log(`   Berkas dihapus : ${resOut.deletedFiles.toLocaleString('id-ID')}`);
console.log(`   Folder dihapus : ${resOut.deletedDirs.toLocaleString('id-ID')}`);
console.log(`   Ruang terbebas : ${(resOut.freedBytes / (1024 * 1024)).toFixed(2)} MB\n`);

// 3. Bersihkan sisa temporary public/covers_* jika ada
const publicDir = path.join(WEB_DIR, 'public');
const tempCoversDirs = ['covers_backup_dups', 'covers_stitch_ready', 'covers_stitch_ready_backup_dups'];
let tempFreed = 0;
for (const tempDir of tempCoversDirs) {
  const p = path.join(publicDir, tempDir);
  if (fs.existsSync(p)) {
    const sub = cleanDirectory(p, false);
    tempFreed += sub.freedBytes;
    console.log(`   Membersihkan temporary: ${tempDir} (${(sub.freedBytes / (1024 * 1024)).toFixed(2)} MB)`);
  }
}

const totalFreedMb = ((resPublic.freedBytes + resOut.freedBytes + tempFreed) / (1024 * 1024)).toFixed(2);
const totalFiles = resPublic.deletedFiles + resOut.deletedFiles;

console.log('=== HASIL AKHIR PURIFIKASI ZERO-BLOAT ===');
console.log(`Total berkas dimusnahkan : ${totalFiles.toLocaleString('id-ID')} berkas`);
console.log(`Total ruang SSD terbebas : ${totalFreedMb} MB (~${(totalFreedMb / 1024).toFixed(2)} GB)`);
console.log(`Status public/covers     : Bersih (.gitkeep terpasang, zero-bloat)`);
console.log(`Status out/covers        : Bersih (.gitkeep terpasang, zero-bloat)`);
