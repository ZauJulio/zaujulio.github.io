export function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <span className='text-xs text-gray-500 uppercase tracking-wider font-medium w-16 shrink-0'>{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          type='button'
          onClick={() => onSelect(opt)}
          className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border cursor-pointer ${
            opt === active
              ? 'bg-brand-500 text-black border-brand-500 font-medium'
              : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
