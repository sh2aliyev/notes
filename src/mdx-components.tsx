import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="dark:text-fd-muted-foreground text-fd-foreground/75 text-sm font-normal not-italic *:before:content-none *:after:content-none"
        {...props}
      >
        {children}
      </blockquote>
    ),
    ...components,
  };
}
