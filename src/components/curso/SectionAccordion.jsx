import { useState } from "react";
import LessonItem from "../LessonItem";

/**
 * SectionAccordion
 * Seção colapsável com lista de lições.
 */
export default function SectionAccordion({ titulo, licoes = [], defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border">
      {/* Header da seção */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          px-5 py-3.5 text-left
          text-[0.78rem] font-black tracking-wider text-ink
          hover:bg-surface-input transition-colors duration-150
        "
      >
        {titulo}
        <span className="text-ink-faint text-xs transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </button>

      {/* Lições */}
      {open && (
        <div className="flex flex-col">
          {licoes.map((licao, i) => (
            <LessonItem
              key={i}
              nome={licao.nome}
              status={licao.concluida ? "done" : licao.atual ? "current" : licao.bloqueada ? "locked" : "default"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
