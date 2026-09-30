const fs = require('fs');
const path = require('path');

console.log('=== [PREBUILD PIPELINE] FOKUSKONTEN MASTER AUTO-SYNC ===');

const dbPath = path.resolve(__dirname, '../../../Server-Fokuskonten/product_digital.db');
const servicePath = path.resolve(__dirname, '../../../Server-Fokuskonten/services/product_digital.service.js');

if (fs.existsSync(dbPath) && fs.existsSync(servicePath)) {
  try {
    console.log('[PREBUILD] Terdeteksi master SQLite lokal product_digital.db. Menjalankan ekspor sekoci...');
    const ProductDigitalService = require(servicePath);
    const syncRes = ProductDigitalService.syncToWebCatalog();
    console.log(`[PREBUILD] Berhasil mengekspor ${syncRes.count || 0} produk aktif ke digitalProducts.json & catalog_products.json.`);

    // Sinkronkan CDN URLs
    const cdnScript = path.resolve(__dirname, 'update_products_json_cdn.js');
    if (fs.existsSync(cdnScript)) {
      require(cdnScript);
    }
  } catch (err) {
    console.warn('[PREBUILD WARNING] Gagal sinkronisasi dari SQLite lokal:', err.message);
  }
} else {
  console.log('[PREBUILD] Lingkungan Cloud/CI terdeteksi (tanpa SQLite fisik). Menggunakan sekoci JSON eksisting.');
}

// Selalu jalankan generate_sitemap.js
try {
  console.log('[PREBUILD] Meregenerasi master sitemap sharded...');
  const sitemapScript = path.resolve(__dirname, 'generate_sitemap.js');
  if (fs.existsSync(sitemapScript)) {
    require(sitemapScript);
  }
} catch (err) {
  console.warn('[PREBUILD WARNING] Gagal regenerasi sitemap:', err.message);
}

console.log('=== [PREBUILD PIPELINE] SELESAI ===');
