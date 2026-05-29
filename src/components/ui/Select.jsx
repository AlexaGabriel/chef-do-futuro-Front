/**
 * Select
 * Wrapper com label opcional e seta customizada via CSS.
 */
export default function Select({ label, id, options = [], placeholder = "", className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-ink uppercase tracking-wide">
          {label}
        </label>
      )}
      <select id={id} className={`select-custom ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
    </div>
  );
}
