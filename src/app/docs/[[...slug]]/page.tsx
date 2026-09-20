import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getIndexMeta, getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { Image } from 'fumadocs-core/framework';
import { createElement } from 'react';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  const indexMeta = getIndexMeta('page', page.slugs);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {indexMeta ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          {createElement(indexMeta.icon, { className: 'size-14 lg:size-16' })}
          <DocsTitle>{indexMeta.title}</DocsTitle>
          <DocsDescription className="max-w-2xl text-base">{indexMeta.desc}</DocsDescription>
        </div>
      ) : (
        <>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
          <div className="flex flex-row items-center gap-2 border-b pb-6">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
            />
          </div>
        </>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // my custom blockquote styling
            blockquote: ({ children, ...props }) => (
              <blockquote
                className="dark:text-fd-muted-foreground text-fd-foreground/75 text-sm font-normal not-italic *:before:content-none **:before:content-none *:after:content-none **:after:content-none"
                {...props}
              >
                {children}
              </blockquote>
            ),
            img: (props) => <Image className="border-fd-border m-auto border-2" loading="eager" {...(props as any)} />,
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
      images: getPageImageUrl(page).url,
    },
  };
}
