import { ArrowDown01Icon } from 'hugeicons-react';

interface SelectProps {
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  options: { id: number; name: string }[];
  disabled?: boolean;
  placeholder?: string;
}

export function Select({
  name,
  label,
  icon,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={[
            'w-full appearance-none rounded-xl border bg-white pl-9 pr-9 py-2.5 text-sm font-medium text-slate-700',
            'border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400',
            'transition-all duration-200',
            disabled
              ? 'opacity-40 cursor-not-allowed bg-slate-50'
              : 'hover:border-slate-300 cursor-pointer',
          ].join(' ')}
        >
          <option value="">{placeholder ?? `Pilih ${label}`}</option>
          {options.map((opt) => (
            <option key={opt.id} value={String(opt.id)}>
              {opt.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <ArrowDown01Icon className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
