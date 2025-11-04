import { GitIcon } from '@/components/icons/git';
import { Network } from 'lucide-react';

export const customIcons = {
  GitIcon,
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
    icon: Network,
  },
};
