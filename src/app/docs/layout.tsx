import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { Logo } from '@/components/logo';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <Logo variant="docs" />,
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
