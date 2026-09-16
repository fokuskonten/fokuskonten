const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.resolve('Server-Fokuskonten/product_digital.db');
const db = new DatabaseSync(dbPath, { readOnly: true });

// Check non-ebook published
const nonEbookRows = db.prepare("SELECT sku, title, category, cover_image, gallery_json FROM digital_products WHERE is_published = 1 AND category NOT LIKE 'E-Book%'").all();
console.log('Total non-ebook is_published=1 in DB:', nonEbookRows.length);

// Also check all published
const allPublishedRows = db.prepare("SELECT sku, title, category FROM digital_products WHERE is_published = 1").all();
console.log('Total all is_published=1 in DB:', allPublishedRows.length);

// Check digitalProducts.json
const jsonPath = path.resolve('Web/fokuskonte.my.id/content/apps/digitalProducts.json');
const jsonProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log('Total in digitalProducts.json:', jsonProducts.length);

// Check folders in public/covers
const coversDir = path.resolve('Web/fokuskonte.my.id/public/covers');
const coverFolders = fs.readdirSync(coversDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);
console.log('Total subdirectories in public/covers:', coverFolders.length);

// Set of SKUs in covers
const coverFolderSet = new Set(coverFolders.map(s => s.toUpperCase()));

let matchedInCovers = 0;
let missingInCovers = 0;
for (const p of nonEbookRows) {
  if (coverFolderSet.has(p.sku.toUpperCase())) {
    matchedInCovers++;
  } else {
    missingInCovers++;
  }
}
console.log(`Non-ebook DB products: ${matchedInCovers} exist in public/covers, ${missingInCovers} missing.`);

// Check JSON products against covers
let jsonMatched = 0;
let jsonMissing = 0;
for (const p of jsonProducts) {
  if (coverFolderSet.has(p.sku.toUpperCase())) {
    jsonMatched++;
  } else {
    jsonMissing++;
  }
}
console.log(`digitalProducts.json: ${jsonMatched} exist in public/covers, ${jsonMissing} missing.`);

const nonEbookSkuSet = new Set(nonEbookRows.map(r => r.sku.toUpperCase()));
const jsonSkuSet = new Set(jsonProducts.map(r => r.sku.toUpperCase()));

const combinedActiveSkus = new Set([...nonEbookSkuSet, ...jsonSkuSet]);
console.log('Combined non-ebook active SKUs:', combinedActiveSkus.size);

let totalFiles = 0;
let totalBytes = 0;
let validFoldersCount = 0;

for (const sku of combinedActiveSkus) {
  const folderName = coverFolders.find(f => f.toUpperCase() === sku);
  if (folderName) {
    validFoldersCount++;
    const fullPath = path.join(coversDir, folderName);
    const files = fs.readdirSync(fullPath);
    totalFiles += files.length;
    for (const f of files) {
      const stat = fs.statSync(path.join(fullPath, f));
      totalBytes += stat.size;
    }
  }
}
console.log(`Found ${validFoldersCount} folders in public/covers for active SKUs.`);
console.log(`Total files: ${totalFiles}, Total size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);

const missingSkus = nonEbookRows.filter(r => !coverFolderSet.has(r.sku.toUpperCase()));
console.log('Missing SKUs detail:', missingSkus.map(m => ({ sku: m.sku, title: m.title, cover: m.cover_image })));

