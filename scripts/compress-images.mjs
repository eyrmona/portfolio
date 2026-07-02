import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const DIR = new URL('../src/assets/uds', import.meta.url).pathname

const JPEG_QUALITY = 82
const PNG_QUALITY = { quality: 80, effort: 6 }

const files = await readdir(DIR)
let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const path = join(DIR, file)
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const { size: before } = await stat(path)
  totalBefore += before

  const img = sharp(path)
  let out

  if (ext === '.jpg' || ext === '.jpeg') {
    out = await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  } else {
    out = await img.png(PNG_QUALITY).toBuffer()
  }

  const after = out.length
  totalAfter += after

  if (after < before) {
    await sharp(out).toFile(path)
    const pct = Math.round((1 - after / before) * 100)
    console.log(`${file.padEnd(32)} ${kb(before)} → ${kb(after)}  (${pct}% smaller)`)
  } else {
    console.log(`${file.padEnd(32)} ${kb(before)} — skipped (already optimal)`)
    totalAfter -= after
    totalAfter += before
  }
}

console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`)

function kb(bytes) { return `${Math.round(bytes / 1024)}KB`.padStart(8) }
