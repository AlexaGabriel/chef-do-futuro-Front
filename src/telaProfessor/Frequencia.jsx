import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALUNOS_TURMA = [
  { nome: "Alice Pereira" },
  { nome: "Ben Chen" },
  { nome: "Carla Davis" },
  { nome: "Luna Gusralt" },
  { nome: "Martin Biden" },
  { nome: "Jani Polay" },
  { nome: "Rafael Torres" },
  { nome: "Mia Santos" },
];

export default function Frequencia() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [presencas, setPresencas] = useState(
    Object.fromEntries(ALUNOS_TURMA.map((a) => [a.nome, "presente"]))
  );
  const [observacoes, setObservacoes] = useState(
    Object.fromEntries(ALUNOS_TURMA.map((a) => [a.nome, ""]))
  );
  const [salvo, setSalvo] = useState(false);

  const filtrados = ALUNOS_TURMA.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function togglePresenca(nome, valor) {
    setPresencas((prev) => ({ ...prev, [nome]: valor }));
  }

  function setObs(nome, valor) {
    setObservacoes((prev) => ({ ...prev, [nome]: valor }));
  }

  function handleSalvar() {
    setSalvo(true);
    setTimeout(() => {
      setSalvo(false);
      navigate("/professor/dashboard");
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-surface font-body flex flex-col overflow-x-hidden">

      {/* Topnav */}
      <header className="h-14 bg-sidebar flex items-center justify-between px-4 sm:px-8 shrink-0">
        <div className="w-9" aria-hidden="true" />
        <h1 className="font-display text-white text-base sm:text-lg font-bold tracking-wide">
          Presença da Turma
        </h1>
        <div
          className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-base shrink-0"
          aria-label="Avatar do professor"
        >
          👤
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 animate-fade-up">

        {/* Card info da turma */}
        <div className="bg-sidebar/80 rounded-card px-4 sm:px-8 py-4 sm:py-5 mb-5 sm:mb-6 text-center">
          <p className="text-white font-bold text-sm sm:text-base">Turma 05 - Salada de Frutas</p>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Data: 04/06/2026 | Horário: 7:30 - 10:00 | Professor: Chef Micael
          </p>
        </div>

        {/* Busca */}
        <div className="relative mb-4 sm:mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint text-sm" aria-hidden="true">🔍</span>
          <input
            placeholder="Pesquisar Aluno"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Pesquisar aluno"
            className="w-full bg-surface-card border border-border rounded-btn pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
          />
        </div>

        {/* ── Tabela desktop (md+) ── */}
        <div className="hidden md:block bg-surface-card rounded-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["ALUNO", "PRESENÇA", "OBSERVAÇÕES"].map((col) => (
                    <th key={col} className="text-left px-6 py-4 text-xs font-black text-ink uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((aluno, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-surface-input border border-border flex items-center justify-center text-base shrink-0" aria-hidden="true">
                          👤
                        </div>
                        <span className="font-medium text-ink">{aluno.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePresenca(aluno.nome, "presente")}
                          aria-pressed={presencas[aluno.nome] === "presente"}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-bold transition-all duration-150 min-h-[44px]
                            ${presencas[aluno.nome] === "presente"
                              ? "bg-green-500 text-white"
                              : "bg-surface-input text-ink-muted hover:bg-green-100 hover:text-green-700"
                            }`}
                        >
                          ✓ PRESENTE
                        </button>
                        <button
                          onClick={() => togglePresenca(aluno.nome, "ausente")}
                          aria-pressed={presencas[aluno.nome] === "ausente"}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-bold transition-all duration-150 min-h-[44px]
                            ${presencas[aluno.nome] === "ausente"
                              ? "bg-red-400 text-white"
                              : "bg-surface-input text-ink-muted hover:bg-red-100 hover:text-red-600"
                            }`}
                        >
                          ✕ AUSENTE
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        placeholder="Sem observações..."
                        value={observacoes[aluno.nome]}
                        onChange={(e) => setObs(aluno.nome, e.target.value)}
                        aria-label={`Observações de ${aluno.nome}`}
                        className="w-full bg-surface-input border border-border rounded-btn px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end px-6 py-4 border-t border-border">
            {salvo ? (
              <span role="status" className="text-green-600 font-bold text-sm flex items-center gap-2">
                ✅ Chamada salva! Redirecionando…
              </span>
            ) : (
              <button
                onClick={handleSalvar}
                className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-8 py-3 rounded-btn transition-all duration-200 active:scale-95 min-h-[44px]"
              >
                Salvar Chamada
              </button>
            )}
          </div>
        </div>

        {/* ── Cards mobile (< md) ── */}
        <div className="md:hidden flex flex-col gap-3">
          {filtrados.map((aluno, i) => (
            <div key={i} className="bg-surface-card rounded-card shadow-sm p-4">
              {/* Header do card */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-surface-input border border-border flex items-center justify-center text-base shrink-0" aria-hidden="true">
                  👤
                </div>
                <span className="font-medium text-ink text-sm">{aluno.nome}</span>
              </div>

              {/* Botões de presença */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => togglePresenca(aluno.nome, "presente")}
                  aria-pressed={presencas[aluno.nome] === "presente"}
                  className={`flex-1 py-2.5 rounded-btn text-sm font-bold transition-all duration-150 min-h-[44px]
                    ${presencas[aluno.nome] === "presente"
                      ? "bg-green-500 text-white"
                      : "bg-surface-input text-ink-muted"
                    }`}
                >
                  ✓ PRESENTE
                </button>
                <button
                  onClick={() => togglePresenca(aluno.nome, "ausente")}
                  aria-pressed={presencas[aluno.nome] === "ausente"}
                  className={`flex-1 py-2.5 rounded-btn text-sm font-bold transition-all duration-150 min-h-[44px]
                    ${presencas[aluno.nome] === "ausente"
                      ? "bg-red-400 text-white"
                      : "bg-surface-input text-ink-muted"
                    }`}
                >
                  ✕ AUSENTE
                </button>
              </div>

              {/* Observação */}
              <input
                placeholder="Observações..."
                value={observacoes[aluno.nome]}
                onChange={(e) => setObs(aluno.nome, e.target.value)}
                aria-label={`Observações de ${aluno.nome}`}
                className="w-full bg-surface-input border border-border rounded-btn px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
              />
            </div>
          ))}

          {/* Botão salvar mobile */}
          <div className="pt-2 pb-4">
            {salvo ? (
              <p role="status" className="text-center text-green-600 font-bold text-sm py-3">
                ✅ Chamada salva! Redirecionando…
              </p>
            ) : (
              <button
                onClick={handleSalvar}
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-sm px-8 py-4 rounded-btn transition-all duration-200 active:scale-95 min-h-[44px]"
              >
                Salvar Chamada
              </button>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
