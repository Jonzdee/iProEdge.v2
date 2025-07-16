const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/shop', changefreq: 'weekly', priority: 0.8 },
  { url: '/cart', changefreq: 'monthly', priority: 0.8 },
  { url: '/dashboard', changefreq: 'monthly', priority: 0.8 },
  // add more pages here
];

const sitemap = new SitemapStream({ hostname: 'https://iproedge.store' });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);
links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap).then(() => console.log('✅ Sitemap generated!'));
