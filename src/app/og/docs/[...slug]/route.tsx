import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { APP_NAME, indexMetaMap } from '@/lib/consts';
import { LogoIcon } from '@/components/icons/logo';
import { getDirname, getFallbackDirname, isIndexPage } from '@/lib/utils';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const isIndex = isIndexPage(page.path);
  const dirName = getDirname(page.slugs, isIndex);
  const indexMeta = indexMetaMap[dirName as keyof typeof indexMetaMap];

  let desc = indexMeta?.title;
  if (!indexMeta) {
    const fallbackDirName = getFallbackDirname(page.slugs, isIndex);
    const indexMeta = indexMetaMap[fallbackDirName as keyof typeof indexMetaMap];
    desc = indexMeta?.title;
  }

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      primaryColor="#450a0a"
      primaryTextColor="#b91c1c"
      description={desc}
      site={APP_NAME}
      icon={<LogoIcon width={96} />}
    />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
