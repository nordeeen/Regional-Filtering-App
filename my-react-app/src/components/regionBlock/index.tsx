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
      <p className="text-xs font-semibold tracking-[0.18em] text-blue-500 uppercase mb-2">
        {label}
      </p>
      <h2
        className={[
          'font-black text-slate-800 leading-none',
          size === 'xl' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl',
        ].join(' ')}
      >
        {name}
      </h2>
    </div>
  );
}
