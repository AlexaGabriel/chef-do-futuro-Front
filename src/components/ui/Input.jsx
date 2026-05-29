/**
 * Input
 * Wrapper com label opcional.
 */
export default function Input({
  label,
  id,
  className = "",
  prefix,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-ink uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-base">
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={`
            w-full bg-surface-input border border-border rounded-btn
            px-4 py-3 text-sm text-ink placeholder:text-ink-faint
            outline-none transition
            focus:border-brand focus:ring-2 focus:ring-brand/20
            ${prefix ? "pl-9" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
}
