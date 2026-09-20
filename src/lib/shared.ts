import { DsaIcon } from '@/components/icons/dsa';
import { GitIcon } from '@/components/icons/git';
import { GoIcon } from '@/components/icons/go';
import { createGetUrl } from 'fumadocs-core/source';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const appName = 'sh2a | Notes';
export const appSummary = 'My Beloved Tech Notes';
export const appDesc =
  'A collection of knowledge filtered from dozens of hours of watched tutorials, read docs, blogs, and searches.';
export const webUrl = 'https://notes.sh2a.org';

export const gitConfig = {
  user: 'sh2aliyev',
  repo: 'notes',
  branch: 'main',
};

export const customIcons = {
  GitIcon,
  DsaIcon,
  GoIcon,
};

export const indexMetaMap = {
  git: {
    title: 'Git',
    desc: 'Git is a free and open-source distributed version control system designed to manage changes to files and support coordinated work among developers.',
    icon: GitIcon,
  },
  dsa: {
    title: 'Data Structures & Algorithms',
    desc: 'Data Structures and Algorithms (DSA) is a fundamental concept in computer science that involves organizing and manipulating data to solve problems and perform tasks effectively.',
    icon: DsaIcon,
  },
  go: {
    title: 'Go',
    desc: 'Go is a high-level general purpose programming language that is statically typed and compiled.',
    icon: GoIcon,
  },
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}

export function getIndexMeta(mode: 'page' | 'og', slugs: string[]) {
  for (let i = slugs.length - 1; i >= 0; i--) {
    if (mode === 'page' && i === slugs.length - 2) {
      return;
    }

    const slug = slugs[i] as keyof typeof indexMetaMap;

    if (indexMetaMap[slug]) {
      return indexMetaMap[slug];
    }
  }

  return;
}
