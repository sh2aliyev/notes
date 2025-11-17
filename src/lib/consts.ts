import { DsaIcon } from '@/components/icons/dsa';
import { GitIcon } from '@/components/icons/git';

export const APP_NAME = 'sh2a | Notes';
export const APP_DESC = 'My Beloved Tech Notes';
export const WEB_URL = 'https://notes.sh2a.org';
export const REPO_URL = 'https://github.com/sh2aliyev/notes';

export const customIcons = {
  GitIcon,
  DsaIcon,
};

export const indexMetaMap = {
  git: {
    title: 'Git',
    desc: 'Git is a free and open-source distributed version control system designed to manage changes to files and support coordinated work among developers.',
    icon: GitIcon,
  },
  dsa: {
    title: 'Data Structures & Algorithms',
    desc: 'Data Structures and Algorithms (DSA) is a fundamental concept in computer science that involves organizing and manipulating data efficiently to solve problems and perform tasks effectively.',
    icon: DsaIcon,
  },
};
