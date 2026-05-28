const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  const sizes = ['192', '512'];
  for (const s of sizes) {
    try {
      if (fs.existsSync(`public/img/icon-${s}.png`)) {
        await sharp(`public/img/icon-${s}.png`)
          .resize(parseInt(s))
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(`public/img/icon-${s}-opt.png`);
        
        fs.renameSync(`public/img/icon-${s}-opt.png`, `public/img/icon-${s}.png`);
        console.log(`Optimized icon-${s}.png`);
      }
    } catch (e) {
      console.error(`Error optimizing ${s}:`, e);
    }
  }
}

optimize().catch(console.error);
