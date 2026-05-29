import ProgressBar from "../ui/ProgressBar";

/**
 * QuickCourseCard
 * Card compacto de acesso rápido exibido no dashboard.
 */
export default function QuickCourseCard({ nome, label, img, progresso, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-surface-card rounded-card shadow-sm overflow-hidden
        cursor-pointer hover:-translate-y-1 hover:shadow-card
        transition-all duration-200
      "
    >
      <img src={img} alt={nome} className="w-full h-28 object-cover" />
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1.5">
        <p className="font-bold text-sm text-ink leading-tight">{nome}</p>
        <p className="text-xs text-ink-faint">{label}</p>
        <ProgressBar value={progresso} />
      </div>
    </div>
  );
}
