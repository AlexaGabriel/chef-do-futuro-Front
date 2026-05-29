/**
 * ProgressBar
 * value: 0-100
 */
export default function ProgressBar({ value = 0, className = "" }) {
  return (
    <div className={`h-1 rounded-full bg-border overflow-hidden ${className}`}>
      <div
        className="h-full bg-brand rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
