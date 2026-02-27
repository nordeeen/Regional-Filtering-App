export function RegionBlock({
  label,
  name,
  size,
}: {
  label: string;
  name: string;
  size: 'xl' | 'lg';
}) {
  return (
    <div className="text-center py-6">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-indigo-500 uppercase mb-2">
        {label}
      </p>
      <h2
        className={[
          'font-black text-slate-800 leading-none',
          size === 'xl' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl',
        ].join(' ')}
      >
        {name}
      </h2>
    </div>
  );
}
