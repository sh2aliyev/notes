import { DsaIcon } from '@/components/icons/dsa';
import { GitIcon } from '@/components/icons/git';
import { GoIcon } from '@/components/icons/go';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const appName = 'sh2a | Notes';
export const appDesc = 'My Beloved Tech Notes';
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
