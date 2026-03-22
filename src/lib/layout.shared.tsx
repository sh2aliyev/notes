import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { REPO_INFO } from '@/consts';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: `https://github.com/${REPO_INFO.user}/${REPO_INFO.repo}`,
  };
}
