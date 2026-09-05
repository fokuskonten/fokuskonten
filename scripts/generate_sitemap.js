const fs = require('fs');
const path = require('path');

const baseUrl = 'https://fokuskonten.my.id';
const today = new Date().toISOString().split('T')[0];

// 1. Static Pages
const staticPages = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/toko-digital', changefreq: 'daily', priority: '0.9' },
  { path: '/aplikasi', changefreq: 'weekly', priority: '0.9' },
  { path: '/tentang', changefreq: 'monthly', priority: '0.7' },
  { path: '/layanan', changefreq: 'monthly', priority: '0.7' },
  { path: '/kontak', changefreq: 'monthly', priority: '0.6' },
  { path: '/dukungan', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/kebijakan-privasi', changefreq: 'yearly', priority: '0.4' },
  { path: '/syarat-ketentuan', changefreq: 'yearly', priority: '0.3' },
  { path: '/lisensi', changefreq: 'yearly', priority: '0.4' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
  { path: '/hak-cipta', changefreq: 'yearly', priority: '0.3' }
];

const urls = [];

for (const p of staticPages) {
  urls.push({
    loc: `${baseUrl}${p.path}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority
  });
}

// 2. Apps
try {
  const appsFile = path.resolve(__dirname, '../content/apps/apps.json');
  if (fs.existsSync(appsFile)) {
    const raw = fs.readFileSync(appsFile, 'utf-8').replace(/^\uFEFF/, '');
    const apps = JSON.parse(raw);
    for (const app of apps) {
      if (app.id) {
        urls.push({
          loc: `${baseUrl}/aplikasi/${app.id}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8'
        });
      }
    }
    console.log(`Added ${apps.length} apps to sitemap.`);
  }
} catch (e) {
  console.warn('Apps file read error:', e.message);
}

// 3. Digital Products
try {
  const productsFile = path.resolve(__dirname, '../content/apps/digitalProducts.json');
  if (fs.existsSync(productsFile)) {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    for (const p of products) {
      if (p.sku && p.isPublished !== false) {
        urls.push({
          loc: `${baseUrl}/toko-digital/${p.sku.toLowerCase()}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8'
        });
      }
    }
    console.log(`Added ${products.length} digital products to sitemap.`);
  }
} catch (e) {
  console.warn('Products file read error:', e.message);
}

// Build XML
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (const u of urls) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${u.loc}</loc>`);
  xmlLines.push(`    <lastmod>${u.lastmod}</lastmod>`);
  xmlLines.push(`    <changefreq>${u.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${u.priority}</priority>`);
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
const xmlContent = xmlLines.join('\n');

// Write public/sitemap.xml
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
console.log(`Generated ${sitemapPath} with ${urls.length} URLs.`);

// Write public/robots.txt
const robotsContent = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://fokuskonten.my.id/sitemap.xml
`;

const robotsPath = path.resolve(__dirname, '../public/robots.txt');
fs.writeFileSync(robotsPath, robotsContent, 'utf-8');
console.log(`Generated ${robotsPath}`);
