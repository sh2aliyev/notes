import { indexMetaMap } from '@/lib/consts';
import Link from 'next/link';
import { createElement } from 'react';

export function Folder({ name }: { name: string }) {
  const data = indexMetaMap[name as keyof typeof indexMetaMap];

  if (!data) {
    return;
  }

  return (
    <Link href={`/docs/${name}`} className="group scale-80 pt-2.5">
      <div className="bg-fd-accent relative -z-10 -mb-4 flex h-8 items-end justify-center rounded-tr-xl">
        <div className="absolute -top-2.5 left-0 h-0 w-1/2 rounded-tl-xl [border-bottom:12px_solid_#e3e3e3] [border-right:10px_solid_transparent] dark:[border-bottom:12px_solid_#2c2c2c]"></div>
        <div className="bg-fd-muted-foreground/30 h-9 w-11/12 translate-y-4 rounded-t-lg duration-100 ease-in-out group-hover:translate-y-0"></div>
      </div>
      <div className="bg-fd-primary-foreground dark:group-hover:bg-fd-secondary flex aspect-video items-center justify-center rounded-xl border shadow-sm group-hover:bg-neutral-100">
        {createElement(data.icon, {
          className: 'size-1/3 text-fd-muted-foreground',
        })}
      </div>
      <p className="text-fd-primary/75 px-3 pt-2 text-center font-medium">{data.title}</p>
    </Link>
  );
}
