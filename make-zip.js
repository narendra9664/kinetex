import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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

const themeDir = path.resolve('shopify-liquid-theme');
const zipPath = path.resolve('kinetex-shopify-theme.zip');

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

execSync(`powershell -Command "Set-Location -Path '${themeDir}'; Compress-Archive -Path * -DestinationPath '${zipPath}' -Force"`);
console.log('ZIP_CREATED_SUCCESSFULLY');
