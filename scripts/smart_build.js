/**
 * scripts/smart_build.js — FokusKonten Ultra-Fast Selective SSG Engine
 * 
 * Mengatasi "SSG Build Explosion Problem" secara zero-cost:
 * Memangkas waktu build dari ~100 detik menjadi 8-15 detik untuk revisi rutin
 * tanpa pernah menghilangkan ribuan halaman teknisi/e-book dari folder out/ (Port 8090 tetap 200 OK).
 * 
 * Penggunaan:
 *   node scripts/smart_build.js toko        -> Build Toko Digital saja (~10 detik)
 *   node scripts/smart_build.js ebook       -> Build E-Book saja (~15 detik)
 *   node scripts/smart_build.js fast        -> Build Toko + Ebook tanpa ribuan teknisi (~25 detik)
 *   node scripts/smart_build.js pages       -> Build Halaman Statis / Landing Page (~3 detik)
 *   node scripts/smart_build.js all         -> Build Full Master 10.297+ halaman
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rawScope = (process.argv[2] || process.env.BUILD_SCOPE || 'all').toLowerCase();
const validScopes = ['all', 'toko', 'ebook', 'fast', 'pages', 'technician'];
const scope = validScopes.includes(rawScope) ? rawScope : 'all';

const webDir = path.resolve(__dirname, '..');
const outDir = path.join(webDir, 'out');
const stashDir = path.join(webDir, '.next_stash_out');

console.log('='.repeat(65));
console.log(`🚀 [SmartBuild] Mode: ${scope.toUpperCase()} | Direktori: ${webDir}`);
console.log('='.repeat(65));

// Tentukan folder yang wajib diawetkan (preserve) dari out/ lama agar tidak hilang
let preserveSections = [];
if (scope === 'toko') {
  preserveSections = ['teknisi-hp', 'teknisi-laptop', 'ebook'];
} else if (scope === 'ebook') {
  preserveSections = ['teknisi-hp', 'teknisi-laptop', 'toko-digital'];
} else if (scope === 'fast') {
  preserveSections = ['teknisi-hp', 'teknisi-laptop'];
} else if (scope === 'pages') {
  preserveSections = ['teknisi-hp', 'teknisi-laptop', 'ebook', 'toko-digital'];
} else if (scope === 'technician') {
  preserveSections = ['ebook', 'toko-digital'];
}

let preservedCount = 0;
const stashedSections = [];

// 1. Fase Pengamanan (Stash) Folder yang Tidak Direvisi
if (preserveSections.length > 0 && fs.existsSync(outDir)) {
  if (!fs.existsSync(stashDir)) {
    fs.mkdirSync(stashDir, { recursive: true });
  }

  for (const sec of preserveSections) {
    const src = path.join(outDir, sec);
    const dst = path.join(stashDir, sec);

    if (fs.existsSync(src)) {
      if (fs.existsSync(dst)) {
        fs.rmSync(dst, { recursive: true, force: true });
      }
      try {
        fs.renameSync(src, dst);
        stashedSections.push(sec);
        preservedCount++;
        console.log(`📦 [Preserve] Mengamankan out/${sec} -> .next_stash_out/${sec}`);
      } catch (err) {
        console.warn(`⚠️ [Preserve Error] Gagal mengamankan ${sec}:`, err.message);
      }
    }
  }
}

// 2. Jalankan Prebuild Sitemap & Kompilasi Next.js
let buildSuccess = false;
try {
  console.log('\n[1/3] Menjalankan Prebuild Sitemap...');
  execSync('node scripts/generate_sitemap.js', { cwd: webDir, stdio: 'inherit' });

  console.log(`\n[2/3] Memulai Kompilasi Next.js SSG (Scope: ${scope.toUpperCase()})...`);
  const tStart = performance.now();
  
  execSync('npx next build', {
    cwd: webDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_SCOPE: scope
    }
  });

  const tDuration = ((performance.now() - tStart) / 1000).toFixed(1);
  console.log(`\n⚡ [Next.js SSG] Selesai dalam ${tDuration} detik!`);
  buildSuccess = true;
} catch (err) {
  console.error('\n❌ [SmartBuild] Kompilasi Next.js Gagal:', err.message);
  process.exitCode = 1;
} finally {
  // 3. Fase Pemulihan (Restore) — Mutlak Berjalan Bahkan Jika Build Gagal
  if (stashedSections.length > 0 && fs.existsSync(stashDir)) {
    console.log('\n[3/3] Memulihkan folder yang diamankan ke out/ ...');
    for (const sec of stashedSections) {
      const stashedPath = path.join(stashDir, sec);
      const targetPath = path.join(outDir, sec);

      if (fs.existsSync(stashedPath)) {
        // Hapus sample dummy yang mungkin baru dibuat next build
        if (fs.existsSync(targetPath)) {
          fs.rmSync(targetPath, { recursive: true, force: true });
        }
        try {
          fs.renameSync(stashedPath, targetPath);
          console.log(`✅ [Restore] out/${sec} berhasil dipulihkan utuh!`);
        } catch (err) {
          console.error(`🚨 [Restore Error] Gagal memulihkan ${sec}:`, err.message);
        }
      }
    }

    // Bersihkan stash folder jika kosong
    try {
      const remaining = fs.readdirSync(stashDir);
      if (remaining.length === 0) {
        fs.rmSync(stashDir, { recursive: true, force: true });
      }
    } catch (_) {}
  }
}

if (buildSuccess) {
  console.log('\n' + '='.repeat(65));
  console.log(`🎉 [SmartBuild SUKSES] Output siap disajikan di Express Port 8090`);
  console.log('='.repeat(65));
}
