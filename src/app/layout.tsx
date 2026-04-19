import { Provider } from '@/components/provider';
import './global.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { appDesc, appName, webUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(webUrl),
  title: appName,
  description: appDesc,
  keywords: ['notes', 'handbook', 'docs', 'tech', 'sh2a'],
  openGraph: {
    type: 'website',
    url: webUrl,
    title: appName,
    description: appDesc,
    siteName: appName,
    images: [
      {
        url: `${webUrl}/icon-96x96.png`,
        alt: appName,
      },
    ],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
