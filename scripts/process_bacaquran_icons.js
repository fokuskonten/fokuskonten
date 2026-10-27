const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path absolut ke direktori drawable di App Mobile
const rootDir = path.resolve(__dirname, '../../..');
const srcDir = path.join(rootDir, 'App Mobile', "BacaQur'an", 'app', 'src', 'main', 'res', 'drawable');
const destDir = path.resolve(__dirname, '../public/app-icons/bacaquran/3d');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log('Source directory:', srcDir);
console.log('Destination directory:', destDir);

const iconsToProcess = [
  { file: 'ic_menu_al_quran.png', out: 'quran.png' },
  { file: 'ic_menu_belajar_tajwid.png', out: 'tajwid.png' },
  { file: 'ic_menu_jadwal_sholat.png', out: 'jadwal_shalat.png' },
  { file: 'ic_menu_kompas_kiblat.png', out: 'kiblat.png' },
  { file: 'ic_menu_dzikir_tasbih.png', out: 'tasbih.png' },
  { file: 'ic_menu_doa_harian.png', out: 'doa_harian.png' },
  { file: 'ic_menu_tahsin.png', out: 'tahsin.png' },
  { file: 'ic_menu_hafalan.png', out: 'hafalan.png' },
  { file: 'ic_menu_hadits.png', out: 'hadits.png' },
  { file: 'ic_menu_kitab_ibadah.png', out: 'kitab_ibadah.png' },
  { file: 'ic_menu_kalender_hijri.png', out: 'kalender_hijri.png' },
  { file: 'ic_menu_asmaul_husna.png', out: 'asmaul_husna.png' },
  { file: 'ic_menu_shalawat.png', out: 'shalawat.png' },
  { file: 'ic_menu_kajian_islam.png', out: 'komunitas.png' },
  { file: 'ic_menu_haji_umrah.png', out: 'haji_umrah.png' },
  { file: 'ic_donasi_masjid_new.png', out: 'donasi_masjid.png' },
  { file: 'ic_donasi_fakir_miskin_new.png', out: 'donasi_sosial.png' },
  { file: 'ic_menu_amalan_harian.png', out: 'amalan_harian.png' },
  { file: 'ic_menu_sirah_tokoh.png', out: 'sirah.png' }
];

async function run() {
  console.log('Processing 3D icons with auto-trim...');
  for (const item of iconsToProcess) {
    const srcPath = path.join(srcDir, item.file);
    const destPath = path.join(destDir, item.out);

    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] Source file not found: ${item.file}`);
      continue;
    }

    try {
      await sharp(srcPath)
        .trim() // Auto-trim transparent borders
        .png({ compressionLevel: 9 })
        .toFile(destPath);

      const meta = await sharp(destPath).metadata();
      console.log(`[OK] Trimmed ${item.file} -> ${item.out} (${meta.width}x${meta.height})`);
    } catch (err) {
      console.error(`[ERROR] Processing ${item.file}:`, err.message);
    }
  }
  console.log('3D Icon processing complete.');
}

run();
