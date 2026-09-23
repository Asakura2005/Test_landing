import fs from 'fs';
import path from 'path';

function extractUrls(html) {
  const urls = [];
  const regex = /https?:\/\/[^\s"'<>)]+/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const u = m[0];
    if (u.match(/\.(png|jpe?g|webp|svg|gif)($|\?)/i) || u.includes('googleusercontent.com') || u.includes('images.unsplash.com') || u.includes('supabase.co')) {
      urls.push(u);
    }
  }
  return [...new Set(urls)];
}

const html1 = fs.readFileSync('E:/Landingp page công ty/frontend/src/pages/stitch/screen1_wow_flagship.html', 'utf8');
const html2 = fs.readFileSync('E:/Landingp page công ty/frontend/src/pages/stitch/screen2_about_craft.html', 'utf8');

const urls1 = extractUrls(html1);
const urls2 = extractUrls(html2);
console.log('Screen 1 images found:', urls1.length);
urls1.forEach((u, i) => console.log(`S1 [${i}]: ${u}`));
console.log('Screen 2 images found:', urls2.length);
urls2.forEach((u, i) => console.log(`S2 [${i}]: ${u}`));
