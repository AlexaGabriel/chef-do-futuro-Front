import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import authService from "../../services/authService";

export default function Topnav({ titulo, progresso }) {
  const navigate = useNavigate();
  const userName = useMemo(() => {
    const user = authService.getUser();
    return user?.nome || "Usuário";
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 bg-[#1a1a1a] flex items-center justify-between px-8 shrink-0">
      {/* Esquerda: título da aula (opcional) */}
      <div className="flex items-center">
        {titulo && (
          <h2 className="text-white font-body text-sm font-black tracking-widest uppercase">
            {titulo}
          </h2>
        )}
      </div>

      {/* Centro: logo */}
      <span className="absolute left-1/2 -translate-x-1/2 font-body text-[#f5ede6] text-2xl font-black tracking-wide text-center pointer-events-none">
        Chef do Futuro
      </span>

      {/* Direita */}
      <div className="flex items-center gap-4">
        {progresso !== undefined && (
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs whitespace-nowrap">
              Seu progresso {progresso}%
            </span>
            <ProgressBar value={progresso} className="w-20" />
          </div>
        )}

        <span className="text-white/60 text-sm">Olá, {userName}</span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-base shrink-0">
          👤
        </div>

        {/* Ícones */}
        <div className="relative">
          <button
            onClick={() => setNotifAberta((o) => !o)}
            className="text-white/50 hover:text-white transition text-lg"
          >
            🔔
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-white text-[9px] flex items-center justify-center font-bold">
            {NOTIFICACOES.length}
          </span>

          {notifAberta && (
            <div className="absolute right-0 top-10 w-80 bg-surface-card rounded-card shadow-card border border-border z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <p className="font-black text-sm text-ink">Notificações</p>
                <button
                  onClick={() => setNotifAberta(false)}
                  className="text-ink-faint hover:text-ink text-xs transition"
                >
                  ✕
                </button>
              </div>
              <ul className="flex flex-col divide-y divide-border max-h-72 overflow-y-auto">
                {NOTIFICACOES.map((n, i) => (
                  <li key={i} className="px-4 py-3 hover:bg-surface-input transition cursor-pointer">
                    <p className="text-xs text-ink leading-relaxed">{n.texto}</p>
                    <p className="text-[10px] text-ink-faint mt-1">{n.tempo}</p>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 border-t border-border">
                <button className="text-xs font-bold text-brand hover:text-brand-dark transition">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/configuracoes")}
          className="text-white/50 hover:text-white transition text-lg"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}
