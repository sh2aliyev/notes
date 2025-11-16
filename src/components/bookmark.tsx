export function Bookmark({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-4 bg-red-700 *:absolute *:-bottom-6 *:[border-top:25px_solid_oklch(50.5%_0.213_27.518)] ${className}`}
    >
      <div className="[border-right:16px_solid_transparent]"></div>
      <div className="[border-left:16px_solid_transparent]"></div>
    </div>
  );
}
