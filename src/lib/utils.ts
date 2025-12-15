export function isIndexPage(path: string) {
  const parts = path.split('/');
  return parts.at(-1) === 'index.mdx';
}

export function getDirname(slugs: string[], isIndex: boolean) {
  if (isIndex) return slugs.at(-1);
  return slugs.at(-2);
}

export function getFallbackDirname(slugs: string[], isIndex: boolean) {
  if (isIndex) return slugs.at(-2);
  return slugs.at(-3);
}
