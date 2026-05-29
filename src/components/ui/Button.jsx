/**
 * Button
 * variants: "primary" | "ghost" | "link"
 */
export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  fullWidth = false,
  onClick,
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-bold text-sm tracking-wide rounded-btn transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand hover:bg-brand-dark active:scale-95 text-white px-6 py-3.5 shadow-sm",
    ghost:
      "bg-transparent border border-border text-ink hover:bg-surface-input px-5 py-3",
    link:
      "bg-transparent text-ink-muted underline hover:text-brand p-0 font-normal text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
