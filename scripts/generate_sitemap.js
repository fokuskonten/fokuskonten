const fs = require('fs');
const path = require('path');

const baseUrl = 'https://fokuskonten.my.id';
const today = new Date().toISOString().split('T')[0];

// 1. Static Pages
const staticPages = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/toko-digital/', changefreq: 'daily', priority: '0.9' },
  { path: '/ebook/', changefreq: 'daily', priority: '1.0' },
  { path: '/aplikasi/', changefreq: 'weekly', priority: '0.9' },
  { path: '/tentang/', changefreq: 'monthly', priority: '0.7' },
  { path: '/layanan/', changefreq: 'monthly', priority: '0.7' },
  { path: '/kontak/', changefreq: 'monthly', priority: '0.6' },
  { path: '/dukungan/', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq/', changefreq: 'monthly', priority: '0.6' },
  { path: '/kebijakan-privasi/', changefreq: 'yearly', priority: '0.4' },
  { path: '/syarat-ketentuan/', changefreq: 'yearly', priority: '0.3' },
  { path: '/lisensi/', changefreq: 'yearly', priority: '0.4' },
  { path: '/disclaimer/', changefreq: 'yearly', priority: '0.3' },
  { path: '/hak-cipta/', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy/', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms/', changefreq: 'yearly', priority: '0.3' }
];

const urls = [];

for (const p of staticPages) {
  urls.push({
    loc: p.path === '/' ? `${baseUrl}/` : `${baseUrl}${p.path}`,
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
          loc: `${baseUrl}/aplikasi/${app.id}/`,
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

// 3. Digital Products (Non-Ebook + IDEB00 Mega Bundle)
try {
  const productsFile = path.resolve(__dirname, '../content/apps/digitalProducts.json');
  if (fs.existsSync(productsFile)) {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    for (const p of products) {
      if (p.sku && p.isPublished !== false) {
        urls.push({
          loc: `${baseUrl}/toko-digital/${p.sku.toLowerCase()}/`,
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

// 4. E-Book Categories & Routes (2.470+ E-Books)
const redirectLines = [];
try {
  const categoriesFile = path.resolve(__dirname, '../content/ebook/categories.json');
  if (fs.existsSync(categoriesFile)) {
    const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf-8'));
    for (const cat of categories) {
      urls.push({
        loc: `${baseUrl}/ebook/${cat.slug}/`,
        lastmod: today,
        changefreq: 'daily',
        priority: '0.9'
      });
    }
    console.log(`Added ${categories.length} ebook categories to sitemap.`);
  }

  const routesFile = path.resolve(__dirname, '../content/ebook/routes.json');
  if (fs.existsSync(routesFile)) {
    const routes = JSON.parse(fs.readFileSync(routesFile, 'utf-8'));
    for (const r of routes) {
      if (r && r.c && r.u) {
        urls.push({
          loc: `${baseUrl}/ebook/${r.c}/${r.u}/`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8'
        });

        if (r.s) {
          const lowerSku = r.s.toLowerCase();
          const targetUrl = `/ebook/${r.c}/${r.u}/`;
          redirectLines.push(`/toko-digital/detail/${lowerSku} ${targetUrl} 301`);
          redirectLines.push(`/toko-digital/detail/${lowerSku}/ ${targetUrl} 301`);
          redirectLines.push(`/toko-digital/${lowerSku} ${targetUrl} 301`);
          redirectLines.push(`/toko-digital/${lowerSku}/ ${targetUrl} 301`);
        }
      }
    }
    console.log(`Added ${routes.length} individual ebook articles to sitemap.`);
  }
} catch (e) {
  console.warn('Ebook files read error:', e.message);
}

// 5. Blog Posts
try {
  const postsFile = path.resolve(__dirname, '../content/blog/posts.json');
  if (fs.existsSync(postsFile)) {
    urls.push({
      loc: `${baseUrl}/blog/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
    for (const post of posts) {
      if (post.slug) {
        urls.push({
          loc: `${baseUrl}/blog/${post.slug}/`,
          lastmod: post.date || today,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    }
    console.log(`Added ${posts.length} blog posts to sitemap.`);
  }
} catch (e) {
  console.warn('Blog file read error:', e.message);
}

// 6. Portfolio
try {
  const portfolioFile = path.resolve(__dirname, '../content/portfolio/portfolio.json');
  if (fs.existsSync(portfolioFile)) {
    urls.push({
      loc: `${baseUrl}/portfolio/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
    const items = JSON.parse(fs.readFileSync(portfolioFile, 'utf-8'));
    for (const item of items) {
      if (item.id) {
        urls.push({
          loc: `${baseUrl}/portfolio/${item.id}/`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    }
    console.log(`Added ${items.length} portfolio items to sitemap.`);
  }
} catch (e) {
  console.warn('Portfolio file read error:', e.message);
}

// 7. Teknisi HP & Laptop (Hardware Directory)
try {
  urls.push({
    loc: `${baseUrl}/teknisi-hp/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${baseUrl}/teknisi-laptop/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${baseUrl}/teknisi-hp/error-lookup/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8'
  });

  const techManifestPath = path.resolve(__dirname, '../content/apps/technician_catalog.json');
  if (fs.existsSync(techManifestPath)) {
    const techManifest = JSON.parse(fs.readFileSync(techManifestPath, 'utf-8'));
    (techManifest.hpBrands || []).forEach(b => {
      urls.push({
        loc: `${baseUrl}/teknisi-hp/${b.slug}/`,
        lastmod: today,
        changefreq: 'daily',
        priority: '0.8'
      });
    });
    (techManifest.laptopBrands || []).forEach(b => {
      urls.push({
        loc: `${baseUrl}/teknisi-laptop/${b.slug}/`,
        lastmod: today,
        changefreq: 'daily',
        priority: '0.8'
      });
    });
  }

  const { DatabaseSync } = require('node:sqlite');
  const dbPath = path.resolve(__dirname, '../../../Server-Fokuskonten/fokuskonten_master.db');
  if (fs.existsSync(dbPath)) {
    const db = new DatabaseSync(dbPath);
    const catalogRows = db.prepare(`SELECT category, brand_slug, slug, updated_at FROM technician_catalog WHERE is_published = 1`).all();
    for (const item of catalogRows) {
      const seg = item.category === 'laptop' ? 'teknisi-laptop' : 'teknisi-hp';
      const lastmodDate = item.updated_at ? item.updated_at.split(' ')[0] : today;
      urls.push({
        loc: `${baseUrl}/${seg}/${item.brand_slug}/${item.slug}/`,
        lastmod: lastmodDate,
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
    console.log(`Added ${catalogRows.length} technician models from SQLite to sitemap.`);
  }
} catch (e) {
  console.warn('Technician sitemap read error:', e.message);
}

// ── 8. SHARDING SITEMAP PER 1.000 URL (FASE 5 SUPERIOR ENTERPRISE) ───────────
const SHARD_SIZE = 1000;
const totalShards = Math.ceil(urls.length / SHARD_SIZE);
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log(`Total URLs: ${urls.length}. Men-generate ${totalShards} shard sitemap (maks ${SHARD_SIZE} URL/shard)...`);

const sitemapIndexLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (let i = 0; i < totalShards; i++) {
  const shardNumber = i + 1;
  const shardUrls = urls.slice(i * SHARD_SIZE, (i + 1) * SHARD_SIZE);
  const shardFilename = `sitemap-${shardNumber}.xml`;
  const shardPath = path.resolve(publicDir, shardFilename);

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const u of shardUrls) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${u.loc}</loc>`);
    xmlLines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    xmlLines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${u.priority}</priority>`);
    xmlLines.push('  </url>');
  }
  xmlLines.push('</urlset>');

  fs.writeFileSync(shardPath, xmlLines.join('\n'), 'utf-8');

  sitemapIndexLines.push('  <sitemap>');
  sitemapIndexLines.push(`    <loc>${baseUrl}/${shardFilename}</loc>`);
  sitemapIndexLines.push(`    <lastmod>${today}</lastmod>`);
  sitemapIndexLines.push('  </sitemap>');
}

sitemapIndexLines.push('</sitemapindex>');
const sitemapIndexPath = path.resolve(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapIndexPath, sitemapIndexLines.join('\n'), 'utf-8');
console.log(`Master Sitemap Index generated at ${sitemapIndexPath} (${totalShards} shards).`);

// ── 9. GENERATE public/robots.txt ─────────────────────────────────────────────
const robotsContent = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://fokuskonten.my.id/sitemap.xml
`;
const robotsPath = path.resolve(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsContent, 'utf-8');
console.log(`Generated ${robotsPath}`);

// ── 10. GENERATE public/_redirects (CLOUDFLARE PAGES 301 PERMANENT REDIRECTS) ──
if (redirectLines.length > 0) {
  const redirectsPath = path.resolve(publicDir, '_redirects');
  fs.writeFileSync(redirectsPath, redirectLines.join('\n') + '\n', 'utf-8');
  console.log(`Generated ${redirectsPath} with ${redirectLines.length} 301 redirect rules for Cloudflare Pages.`);
}
