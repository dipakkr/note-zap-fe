/**
 * Sitemap Generator Script
 * Automatically generates sitemap.xml from routes and tools data
 * Run: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://postzaper.com';

// Static pages configuration
const staticPages = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.7 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms', changefreq: 'yearly', priority: 0.3 },
    { path: '/tools', changefreq: 'weekly', priority: 0.9 },
];

// Read and parse tools data from TypeScript file
function getToolSlugs() {
    const toolsFilePath = path.join(__dirname, '../src/data/tools.ts');
    const toolsContent = fs.readFileSync(toolsFilePath, 'utf-8');

    // Extract all slug values using regex
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let match;

    while ((match = slugRegex.exec(toolsContent)) !== null) {
        slugs.push(match[1]);
    }

    return slugs;
}

// Generate XML for a single URL entry
function generateUrlEntry(loc, changefreq = 'monthly', priority = 0.5) {
    const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Main sitemap generation
function generateSitemap() {
    const urls = [];

    // Add static pages
    for (const page of staticPages) {
        urls.push(generateUrlEntry(`${SITE_URL}${page.path}`, page.changefreq, page.priority));
    }

    // Add tool pages dynamically
    const toolSlugs = getToolSlugs();
    console.log(`📦 Found ${toolSlugs.length} tools to add to sitemap`);

    for (const slug of toolSlugs) {
        urls.push(generateUrlEntry(`${SITE_URL}/tools/${slug}`, 'monthly', 0.8));
    }

    // Build the complete sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

    // Write to public folder
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap, 'utf-8');

    console.log(`✅ Sitemap generated successfully!`);
    console.log(`   📍 Location: ${outputPath}`);
    console.log(`   🔗 Total URLs: ${urls.length}`);
}

// Run the generator
generateSitemap();
