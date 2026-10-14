# Avikawares

React + TypeScript app powered by Vite and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Tailwind CSS is connected through `@tailwindcss/vite` in `vite.config.ts` and imported in `src/index.css`. Use Tailwind utility classes directly in your JSX.

## Other commands

```bash
npm run build
npm run lint
npm run preview
```

## Product image optimization

JPEG images in `public/products` are converted to a WebP variant up to
1200×1600 (preserving each image's aspect ratio) before `npm run dev` and
`npm run build`. Product data references the generated WebP files directly, so
commit the referenced `*-md.webp` files (or commit the source JPEGs and ensure
the optimization script can generate them) so they are available after a Git
sync.
To regenerate them manually, run:

```bash
npm run optimize:images
```
