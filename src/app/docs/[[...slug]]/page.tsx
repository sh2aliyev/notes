import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getDirname, isIndexPage } from '@/lib/utils';
import { indexMetaMap } from '@/lib/consts';
import { createElement } from 'react';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const isIndex = isIndexPage(page.path);
  const dirName = getDirname(page.slugs, isIndex);
  const indexMeta = indexMetaMap[dirName as keyof typeof indexMetaMap];

  return (
    <DocsPage
      toc={isIndex ? undefined : page.data.toc}
      tableOfContent={{
        style: 'clerk',
      }}
      full={page.data.full}
    >
      {isIndex && indexMeta ? (
        <div className="flex flex-col items-center gap-4 border-b text-center">
          {createElement(indexMeta.icon, { className: 'size-16' })}
          <DocsTitle>{indexMeta.title}</DocsTitle>
          <DocsDescription className="max-w-2xl text-base">{indexMeta.desc}</DocsDescription>
        </div>
      ) : (
        <>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
