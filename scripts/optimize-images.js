import { readdir, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/products");
const OUTPUT_DIR = path.resolve("public/products");
const VARIANT = { suffix: "md", width: 1200, height: 1600, quality: 85 };

await mkdir(OUTPUT_DIR, { recursive: true });

const files = await readdir(SOURCE_DIR);
const staleSmallVariants = files.filter((file) => /-sm\.webp$/i.test(file));
await Promise.all(
  staleSmallVariants.map((file) => unlink(path.join(OUTPUT_DIR, file)))
);

const images = files.filter((file) => /\.(jpe?g)$/i.test(file));

for (const file of images) {
  const source = path.join(SOURCE_DIR, file);
  const name = path.parse(file).name;

  await sharp(source)
    .resize(VARIANT.width, VARIANT.height, { fit: "inside" })
    .webp({ quality: VARIANT.quality })
    .toFile(path.join(OUTPUT_DIR, `${name}-${VARIANT.suffix}.webp`));
}

console.log(`Optimized ${images.length} product image(s) into md WebP variants.`);
