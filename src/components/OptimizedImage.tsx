import type { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

function getWebpSrcSet(src: string) {
  if (!src.startsWith("/") || src.startsWith("//") || !/\.jpe?g$/i.test(src)) {
    return null;
  }

  const base = src.replace(/\.(jpe?g)$/i, "");
  return `${base}-md.webp`;
}

export function OptimizedImage({ src, ...props }: Props) {
  const webpSrcSet = getWebpSrcSet(src);

  return (
    <picture>
      {webpSrcSet ? (
        <source type="image/webp" srcSet={webpSrcSet} />
      ) : null}
      <img
        src={src}
        {...props}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
