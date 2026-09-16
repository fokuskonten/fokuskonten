const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');

sharp.cache(false);
sharp.concurrency(os.cpus().length || 4);

const TARGET_DIR = path.resolve(__dirname, '../../../fokuskonten-assets/toko-digital');

console.log('=== MULTI-CORE SHARP BATCH COMPRESSOR TOKO DIGITAL (PRESET 800px / Q80) ===');
console.log('Direktori Target:', TARGET_DIR);
console.log('Alokasi CPU Cores:', os.cpus().length);

const skuDirs = fs.readdirSync(TARGET_DIR).filter(d => {
  const p = path.join(TARGET_DIR, d);
  return fs.statSync(p).isDirectory();
});

const fileList = [];
let initialTotalBytes = 0;

for (const dir of skuDirs) {
  const fullDir = path.join(TARGET_DIR, dir);
  const files = fs.readdirSync(fullDir);
  for (const f of files) {
    const fullFile = path.join(fullDir, f);
    const stat = fs.statSync(fullFile);
    if (!stat.isFile()) continue;
    
    const ext = path.extname(f).toLowerCase();
    initialTotalBytes += stat.size;
    
    if (['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
      fileList.push({
        sku: dir,
        filename: f,
        filePath: fullFile,
        ext,
        initialSize: stat.size
      });
    }
  }
}

console.log(`Ditemukan ${fileList.length} file gambar dari ${skuDirs.length} folder SKU.`);

const CONCURRENCY = Math.min(16, Math.max(4, os.cpus().length * 2));
let processedCount = 0;
let finalTotalBytes = 0;
let failedCount = 0;
const startTime = Date.now();

async function processFile(item) {
  const { filePath, ext, initialSize } = item;
  try {
    const tempOut = filePath + '.tmp';
    let pipeline = sharp(filePath, { failOnError: false })
      .rotate()
      .resize({
        width: 800,
        height: 800,
        fit: 'inside',
        withoutEnlargement: true
      });

    if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 80, effort: 4 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ palette: true, quality: 75, effort: 7 });
    }

    const buffer = await pipeline.toBuffer();
    
    if (buffer && buffer.length > 0) {
      fs.writeFileSync(tempOut, buffer);
      fs.renameSync(tempOut, filePath);
      finalTotalBytes += buffer.length;
    } else {
      finalTotalBytes += initialSize;
    }
  } catch (err) {
    failedCount++;
    finalTotalBytes += initialSize;
  }

  processedCount++;
  if (processedCount % 200 === 0 || processedCount === fileList.length) {
    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
    const pct = ((processedCount / fileList.length) * 100).toFixed(1);
    process.stdout.write(`\r[PROGRES] ${processedCount}/${fileList.length} (${pct}%) | Waktu: ${elapsedSec}s `);
  }
}

async function runBatch() {
  const queue = [...fileList];
  const workers = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push((async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (item) {
          await processFile(item);
        }
      }
    })());
  }

  await Promise.all(workers);

  // Tambahkan file non-gambar (seperti .json) ke final total
  for (const dir of skuDirs) {
    const fullDir = path.join(TARGET_DIR, dir);
    const files = fs.readdirSync(fullDir);
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
        finalTotalBytes += fs.statSync(path.join(fullDir, f)).size;
      }
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const finalMb = (finalTotalBytes / (1024 * 1024)).toFixed(2);

  console.log('\n\n=== REKAPITULASI HASIL KOMPRESI CERDAS ===');
  console.log(`Total File Diproses : ${processedCount}`);
  console.log(`File Gagal          : ${failedCount}`);
  console.log(`Waktu Eksekusi      : ${durationSec} detik`);
  console.log(`Ukuran Awal Baseline: 1134.48 MB`);
  console.log(`Ukuran Akhir        : ${finalMb} MB`);
  const savedMb = (1134.48 - parseFloat(finalMb)).toFixed(2);
  const percentSaved = (((1134.48 - parseFloat(finalMb)) / 1134.48) * 100).toFixed(1);
  console.log(`Penghematan Bersih  : ${savedMb} MB (${percentSaved}% lebih ramping)`);
}

runBatch().catch(err => {
  console.error('Fatal batch error:', err);
  process.exit(1);
});
