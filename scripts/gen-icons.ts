// Generate the web icon set from the `icon.png` source artwork:
// favicon.ico (16/32/48), PNG favicons, apple-touch-icon, PWA icons +
// maskable variant, and site.webmanifest. Run once with `bun scripts/gen-icons.ts`.
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const SRC = 'icon.png'
const OUT = 'static'
const png = (size: number) =>
	sharp(SRC).resize(size, size).png({ palette: true, compressionLevel: 9 }).toBuffer()

const render = async (size: number, name: string) => {
	const buf = await png(size)
	writeFileSync(`${OUT}/${name}`, buf)
	console.log(name, `${(buf.length / 1024).toFixed(1)} KB`)
}

// Standard favicons + PWA icons
for (const [size, name] of [
	[16, 'favicon-16x16.png'],
	[32, 'favicon-32x32.png'],
	[180, 'apple-touch-icon.png'],
	[192, 'icon-192.png'],
	[512, 'icon-512.png'],
] as const)
	await render(size, name)

// Maskable icon: artwork centered in the 80% safe zone on black
const maskable = await sharp(SRC)
	.resize(410, 410)
	.extend({ top: 51, bottom: 51, left: 51, right: 51, background: '#000000' })
	.png({ palette: true, compressionLevel: 9 })
	.toBuffer()
writeFileSync(`${OUT}/icon-maskable-512.png`, maskable)
console.log('icon-maskable-512.png', `${(maskable.length / 1024).toFixed(1)} KB`)

// favicon.ico = ICONDIR + entries + embedded PNGs (Vista+ style, no BMP needed)
const sizes = [16, 32, 48]
const images = await Promise.all(sizes.map(png))
const header = Buffer.alloc(6 + 16 * images.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = header.length
images.forEach((img, i) => {
	const entry = header.subarray(6 + i * 16, 6 + (i + 1) * 16)
	entry[0] = sizes[i]
	entry[1] = sizes[i]
	entry[4] = 1
	entry[5] = 32
	entry.writeUInt32LE(img.length, 8)
	entry.writeUInt32LE(offset, 12)
	offset += img.length
})
writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, ...images]))
console.log('favicon.ico built from', sizes.join('/'))

writeFileSync(
	`${OUT}/site.webmanifest`,
	JSON.stringify(
		{
			name: 'Svelysia',
			short_name: 'Svelysia',
			start_url: '/',
			display: 'standalone',
			background_color: '#000000',
			theme_color: '#ec4899',
			icons: [
				{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
				{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
				{
					src: '/icon-maskable-512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		},
		null,
		'\t',
	) + '\n',
)
console.log('site.webmanifest written')
