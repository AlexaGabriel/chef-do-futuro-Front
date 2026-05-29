/**
 * LessonItem
 * Uma lição dentro de uma seção do curso.
 * status: "done" | "current" | "locked" | "default"
 */
export default function LessonItem({ nome, status = "default", onClick }) {
  const isCurrent = status === "current";
  const isLocked  = status === "locked";
  const isDone    = status === "done";

  return (
    <button
      onClick={!isLocked ? onClick : undefined}
      disabled={isLocked}
      className={`
        w-full flex items-center justify-between
        px-5 py-2.5 text-left text-xs transition-colors duration-150
        ${isCurrent
          ? "bg-brand/10 border-l-[3px] border-brand font-bold text-ink"
          : "border-l-[3px] border-transparent text-ink-muted hover:text-ink hover:bg-surface-input"
        }
        ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span className="leading-snug">{nome}</span>
      {isDone   && <span className="text-green-500 text-sm">✅</span>}
      {isLocked && <span className="text-ink-faint text-sm">🔒</span>}
    </button>
  );
}
