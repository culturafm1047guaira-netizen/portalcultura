const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'img');

async function optimizeImage(filename, width, height) {
  const filePath = path.join(imgDir, filename);
  const tempPath = path.join(imgDir, `temp_${filename}`);
  
  if (fs.existsSync(filePath)) {
    console.log(`Optimizing ${filename}...`);
    try {
      await sharp(filePath)
        .resize(width, height, { fit: 'inside' })
        .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
        .toFile(tempPath);
        
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      console.log(`Successfully optimized ${filename}`);
    } catch (err) {
      console.error(`Error optimizing ${filename}:`, err);
    }
  }
}

async function run() {
  await optimizeImage('icon-192.png', 192, 192);
  await optimizeImage('icon-512.png', 512, 512);
  await optimizeImage('og-image.png', 1200, 630);
  console.log("Optimization complete!");
}

run();
