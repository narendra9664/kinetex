import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const assetsDir = path.resolve('shopify-liquid-theme/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const distAssets = fs.readdirSync('dist/assets');
const cssFile = distAssets.find(f => f.endsWith('.css'));
const jsFile = distAssets.find(f => f.startsWith('index-') && f.endsWith('.js'));
const shopifyJsFile = distAssets.find(f => f.startsWith('shopify-') && f.endsWith('.js'));

if (cssFile) fs.copyFileSync(path.join('dist/assets', cssFile), path.join(assetsDir, 'index.css'));
if (jsFile) fs.copyFileSync(path.join('dist/assets', jsFile), path.join(assetsDir, 'index.js'));
if (shopifyJsFile) fs.copyFileSync(path.join('dist/assets', shopifyJsFile), path.join(assetsDir, 'shopify.js'));

const zip = new AdmZip();
const themeDir = path.resolve('shopify-liquid-theme');

// Add all files/folders inside themeDir directly to root of zip
zip.addLocalFolder(themeDir, '');

const zipPath = path.resolve('kinetex-shopify-theme.zip');
zip.writeZip(zipPath);

console.log('ZIP_CREATED_WITH_ADM_ZIP');
