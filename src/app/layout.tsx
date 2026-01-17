import { Provider } from '@/components/provider';
import './global.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { APP_DESC, APP_NAME, WEB_URL } from '@/lib/consts';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL),
  title: APP_NAME,
  description: APP_DESC,
  keywords: ['notes', 'handbook', 'docs', 'tech', 'sh2a'],
  openGraph: {
    type: 'website',
    url: WEB_URL,
    title: APP_NAME,
    description: APP_DESC,
    siteName: APP_NAME,
    images: [
      {
        url: `${WEB_URL}/icon-96x96.png`,
        alt: APP_NAME,
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
