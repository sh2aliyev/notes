import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Logo } from '@/components/logo';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      nav={{
        title: <Logo variant="app" />,
      }}
    >
      {children}
    </HomeLayout>
  );
}
