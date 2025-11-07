import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="dark:text-fd-muted-foreground text-fd-foreground/75 text-sm font-normal not-italic *:before:content-none **:before:content-none *:after:content-none **:after:content-none"
        {...props}
      >
        {children}
      </blockquote>
    ),
    img: (props) => <ImageZoom className="border-fd-border m-auto border-2" {...(props as any)} />,
    ...components,
  };
}
