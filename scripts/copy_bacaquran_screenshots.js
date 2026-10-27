const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../..');
const srcDir = path.join(rootDir, 'scratch', 'bacaquran_scenes');
const destDir = path.resolve(__dirname, '../public/screenshots/bacaquran');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const screenshotMapping = [
  { src: '02_dashboard_beranda.jpg', dest: '01_Dashboard_Beranda.jpg' },
  { src: '03_al_quran_surah_list.jpg', dest: '02_Daftar_Surah_AlQuran.jpg' },
  { src: '04_mushaf_ayat_tajwid.jpg', dest: '03_Mushaf_Tajwid_Warna.jpg' },
  { src: '05_murottal_audio_player.jpg', dest: '04_Audio_Murottal_PerAyat.jpg' },
  { src: '06_jadwal_shalat_alarm.jpg', dest: '05_Jadwal_Shalat_Adzan.jpg' },
  { src: '07_kompas_kiblat_sensor.jpg', dest: '06_Kompas_Arah_Kiblat.jpg' },
  { src: '08_kalender_hijriah.jpg', dest: '07_Kalender_Hijriah_Puasa.jpg' },
  { src: '09_dzikir_tasbih_digital.jpg', dest: '08_Tasbih_Digital_Haptic.jpg' },
  { src: '10_kumpulan_doa_harian.jpg', dest: '09_Doa_Harian_Dzikir.jpg' },
  { src: '11_belajar_tajwid_tahsin.jpg', dest: '10_Belajar_Tajwid_Tahsin.jpg' },
  { src: '12_hadits_kitab_ibadah.jpg', dest: '11_Hadits_Kitab_Ibadah.jpg' },
  { src: '13_asmaul_husna_shalawat.jpg', dest: '12_Asmaul_Husna_Shalawat.jpg' }
];

console.log('Copying 12 curated HD screenshots...');
for (const item of screenshotMapping) {
  const from = path.join(srcDir, item.src);
  const to = path.join(destDir, item.dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    const stat = fs.statSync(to);
    console.log(`[OK] Copied ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
  } else {
    console.warn(`[WARN] Not found: ${item.src}`);
  }
}

console.log('Screenshots copy complete.');
