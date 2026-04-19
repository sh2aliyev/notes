export function Logo({ variant }: { variant: 'app' | 'docs' }) {
  return (
    <div className="text-fd-foreground/75 group flex">
      <span
        className={`border-fd-foreground/75 group-hover:border-fd-foreground group-hover:text-fd-foreground rounded-tl-md border px-1 font-medium tracking-wide ${variant === 'app' ? 'text-sm lg:text-base' : 'text-sm'}`}
      >
        Notes
      </span>
      <span
        className={`-mt-1.5 -ml-5 max-h-fit px-0.5 text-xs leading-3 font-normal ${variant === 'docs' ? 'bg-fd-background md:bg-fd-card' : 'bg-fd-background'}`}
      >
        sh
        <span className="group-hover:text-fd-foreground">2</span>a
      </span>
    </div>
  );
}
