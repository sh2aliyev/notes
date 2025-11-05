import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Logo } from '@/components/logo';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      nav={{
        title: <Logo variant="app" />,
      }}
      {...baseOptions()}
    >
      {children}
    </HomeLayout>
  );
}
