const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const INDEX_PATH = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/toko_digital_assets_index.json');
const PRODUCTS_JSON = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/digitalProducts.json');
const SUMMARY_JSON = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/store_summary.json');

const assetsIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
const cdnBase = 'https://cdn.jsdelivr.net/gh/mcjobs-id/fokuskonten-assets@main/toko-digital';

let updatedCount = 0;
let totalSlidesCount = 0;

for (const p of products) {
  const sku = (p.sku || '').toUpperCase();
  const asset = assetsIndex.by_sku[sku];

  if (asset && asset.files && asset.files.length > 0) {
    const coverFile = asset.cover || `${sku}_cover.webp`;
    p.coverImage = `${cdnBase}/${sku}/${coverFile}`;
    p.image = `${cdnBase}/${sku}/${coverFile}`;
    p.gallery = asset.files.map(f => `${cdnBase}/${sku}/${f}`);
    totalSlidesCount += asset.files.length;
    updatedCount++;
  } else if (p.coverImage && p.coverImage.startsWith('/covers/')) {
    p.coverImage = `${cdnBase}/${sku}/${sku}_cover.webp`;
    p.image = `${cdnBase}/${sku}/${sku}_cover.webp`;
    if (!p.gallery || p.gallery.length === 0) {
      p.gallery = [`${cdnBase}/${sku}/${sku}_cover.webp`];
    }
  }
}

fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(products, null, 2), 'utf8');
console.log(`Updated ${updatedCount} products in digitalProducts.json with ${totalSlidesCount} total slide URLs.`);

// Update store_summary.json
if (fs.existsSync(SUMMARY_JSON)) {
  const summary = JSON.parse(fs.readFileSync(SUMMARY_JSON, 'utf8'));
  let sumUpdated = 0;

  function updateItem(it) {
    if (!it || !it.sku) return;
    const sku = it.sku.toUpperCase();
    const asset = assetsIndex.by_sku[sku];
    const coverFile = asset?.cover || `${sku}_cover.webp`;
    it.coverImage = `${cdnBase}/${sku}/${coverFile}`;
    if (it.image) it.image = `${cdnBase}/${sku}/${coverFile}`;
    sumUpdated++;
  }

  if (summary.showcase) {
    Object.values(summary.showcase).forEach(arr => {
      if (Array.isArray(arr)) arr.forEach(updateItem);
    });
  }

  fs.writeFileSync(SUMMARY_JSON, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`Updated ${sumUpdated} products in store_summary.json.`);
}

// Update catalog_products.json
const CATALOG_JSON = path.join(ROOT_DIR, 'Web/fokuskonte.my.id/content/apps/catalog_products.json');
if (fs.existsSync(CATALOG_JSON)) {
  const catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
  let catUpdated = 0;

  for (const p of catalog) {
    const sku = (p.sku || '').toUpperCase();
    if (sku === 'IDEB00') continue; // Pertahankan fallback lokal IDEB00
    const asset = assetsIndex.by_sku[sku];

    if (asset && asset.files && asset.files.length > 0) {
      const coverFile = asset.cover || `${sku}_cover.webp`;
      p.coverImage = `${cdnBase}/${sku}/${coverFile}`;
      p.image = `${cdnBase}/${sku}/${coverFile}`;
      p.gallery = asset.files.map(f => `${cdnBase}/${sku}/${f}`);
      catUpdated++;
    } else if (p.coverImage && p.coverImage.startsWith('/covers/')) {
      p.coverImage = `${cdnBase}/${sku}/${sku}_cover.webp`;
      p.image = `${cdnBase}/${sku}/${sku}_cover.webp`;
      if (!p.gallery || p.gallery.length === 0) {
        p.gallery = [`${cdnBase}/${sku}/${sku}_cover.webp`];
      }
      catUpdated++;
    }
  }

  fs.writeFileSync(CATALOG_JSON, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Updated ${catUpdated} products in catalog_products.json.`);
}
