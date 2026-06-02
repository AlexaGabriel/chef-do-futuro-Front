import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
        <button className="text-white/50 hover:text-white transition text-lg">🔔</button>
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
