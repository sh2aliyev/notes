import { Bookmark } from '@/components/bookmark';
import { Folder } from '@/components/folder';
import { MountainIcon } from '@/components/icons/mountain';
import { APP_DESC, indexMetaMap } from '@/lib/consts';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container p-4">
      <div className="flex flex-col gap-6 rounded-2xl border p-3 lg:flex-row lg:items-start">
        <div className="bg-fd-primary-foreground relative rounded-xl border shadow-xs lg:flex-3 xl:flex-2">
          <Bookmark className="right-10 -mt-px h-8 lg:right-14 lg:h-14" />
          <div className="flex h-full flex-col items-center justify-between gap-12 px-3 pt-10 pb-5 lg:gap-28 lg:pt-24">
            <div className="text-fd-primary/85 flex flex-col items-center gap-3 lg:gap-4">
              <h1 className="text-2xl font-semibold lg:text-3xl">Notes</h1>
              <p className="text-sm lg:text-base">{APP_DESC}</p>
            </div>
            <MountainIcon className="text-fd-primary/75 dark:text-fd-primary/55 max-w-56" />
            <p suppressHydrationWarning className="text-fd-primary/75 text-xs">
              {`© ${new Date().getFullYear()} `}
              <Link href="https://sh2a.org" target="_blank" className="hover:text-fd-primary hover:underline">
                sh2a.org
              </Link>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:flex-5 lg:grid-cols-3 xl:grid-cols-5">
          {Object.keys(indexMetaMap).map((name) => {
            return <Folder key={name} name={name} />;
          })}
        </div>
      </div>
      <div className="text-fd-muted-foreground mt-2 text-center text-xs">
        Work is still in progress. For full documentation, see the{' '}
        <Link
          href={'https://github.com/sh2aliyev/notes/tree/legacy'}
          target="_blank"
          className="hover:text-fd-primary/75 underline"
        >
          legacy branch
        </Link>
        .
      </div>
    </div>
  );
}
