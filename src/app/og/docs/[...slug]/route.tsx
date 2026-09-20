import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { generateOGImage } from 'fumadocs-ui/og';
import { appName, getIndexMeta, getPageImageUrl } from '@/lib/shared';
import { BookmarkIcon } from '@/components/icons/bookmark';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const indexMeta = getIndexMeta('og', page.slugs);

  return generateOGImage({
    title: page.data.title,
    description: indexMeta?.title,
    site: appName,
    icon: <BookmarkIcon width={96} height={96} />,
    primaryColor: '#610a0a',
    primaryTextColor: '#b91c1c',
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
