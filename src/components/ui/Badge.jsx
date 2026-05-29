/**
 * Badge
 * variants: "default" | "progress" | "success"
 */
export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default:  "bg-surface-input text-ink-muted",
    progress: "bg-brand-pale text-brand font-bold",
    success:  "bg-green-100 text-green-700 font-bold",
  };
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
