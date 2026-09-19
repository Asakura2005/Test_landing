import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ASSETS_DIR = path.resolve(__dirname, '../src/assets')
const PUBLIC_DIR = path.resolve(__dirname, '../public')

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    })
  )
  return files.flat()
}

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null

  const targetPath = filePath.substring(0, filePath.length - ext.length) + '.webp'
  const isLogoOrPartner = filePath.includes('pictures_doitac') || filePath.includes('logo-haq')

  const originalStats = await fs.promises.stat(filePath)
  const originalSize = originalStats.size

  try {
    let pipeline = sharp(filePath)
    if (isLogoOrPartner) {
      pipeline = pipeline.webp({ quality: 90, nearLossless: true, effort: 6 })
    } else {
      pipeline = pipeline.webp({ quality: 82, effort: 6 })
    }

    await pipeline.toFile(targetPath)
    const newStats = await fs.promises.stat(targetPath)
    const newSize = newStats.size
    const savedBytes = originalSize - newSize
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1)

    return {
      file: path.relative(ASSETS_DIR, filePath),
      originalSize,
      newSize,
      savedBytes,
      savedPercent,
    }
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err.message)
    return null
  }
}

async function optimizeFavicon() {
  const faviconPath = path.join(PUBLIC_DIR, 'favicon.jpg')
  if (!fs.existsSync(faviconPath)) return

  const originalStats = await fs.promises.stat(faviconPath)
  console.log(`\nOptimizing public/favicon.jpg (original: ${(originalStats.size / 1024).toFixed(1)} KB)...`)

  // Backup original
  const backupPath = path.join(PUBLIC_DIR, 'favicon.orig.jpg')
  if (!fs.existsSync(backupPath)) {
    await fs.promises.copyFile(faviconPath, backupPath)
  }

  // Create crisp 64x64 icon
  await sharp(backupPath)
    .resize(64, 64, { fit: 'cover' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(faviconPath)

  // Also create favicon.webp
  await sharp(backupPath)
    .resize(64, 64, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'favicon.webp'))

  const newStats = await fs.promises.stat(faviconPath)
  console.log(`Favicon optimized: ${(originalStats.size / 1024).toFixed(1)} KB -> ${(newStats.size / 1024).toFixed(1)} KB (Saved: ${(((originalStats.size - newStats.size) / originalStats.size) * 100).toFixed(1)}%)`)
}

async function main() {
  console.log('Scanning assets directory for images to convert to WebP...')
  const allFiles = await getFiles(ASSETS_DIR)
  const imageFiles = allFiles.filter((f) => ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase()))

  console.log(`Found ${imageFiles.length} images in src/assets/. Converting now...\n`)

  let totalOriginal = 0
  let totalNew = 0
  const results = []

  for (const img of imageFiles) {
    const res = await convertImage(img)
    if (res) {
      totalOriginal += res.originalSize
      totalNew += res.newSize
      results.push(res)
      console.log(`✓ ${res.file} -> .webp | ${(res.originalSize / 1024).toFixed(1)} KB -> ${(res.newSize / 1024).toFixed(1)} KB (-${res.savedPercent}%)`)
    }
  }

  await optimizeFavicon()

  const totalSaved = totalOriginal - totalNew
  const overallSavedPercent = ((totalSaved / totalOriginal) * 100).toFixed(1)

  console.log('\n================ SUMMARY ================')
  console.log(`Total images converted: ${results.length}`)
  console.log(`Total original size:    ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`Total WebP size:        ${(totalNew / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`Total bandwidth saved:  ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (-${overallSavedPercent}%)`)
  console.log('=========================================\n')
}

main().catch(console.error)
