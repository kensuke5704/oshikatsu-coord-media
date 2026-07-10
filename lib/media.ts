export function withBasePath(src: string | undefined) {
  if (!src) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (
    basePath === "" ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith(`${basePath}/`) ||
    !src.startsWith("/")
  ) {
    return src;
  }

  return `${basePath}${src}`;
}
