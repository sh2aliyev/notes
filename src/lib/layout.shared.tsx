import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { REPO_URL } from './consts';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: REPO_URL,
  };
}
