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
    <div className="min-h-screen bg-surface font-body flex flex-col">

      {/* Topnav */}
      <header className="h-14 bg-sidebar flex items-center justify-between px-8 shrink-0">
        <div className="w-9" /> {/* espaçador */}
        <h1 className="font-display text-white text-lg font-bold tracking-wide">
          Presença da Turma
        </h1>
        <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-base">
          👤
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 animate-fade-up">

        {/* Card info da turma */}
        <div className="bg-sidebar/80 rounded-card px-8 py-5 mb-6 text-center">
          <p className="text-white font-bold text-base">Turma 05 - Salada de Frutas</p>
          <p className="text-white/60 text-sm mt-1">
            Data: 04/06/2026 | Horário: 7:30 - 10:00 | Professor: Chef Micael
          </p>
        </div>

        {/* Busca */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
          <input
            placeholder="Pesquisar Aluno"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-surface-card border border-border rounded-btn pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
          />
        </div>

        {/* Tabela */}
        <div className="bg-surface-card rounded-card shadow-sm overflow-hidden">
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
                  {/* Aluno */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-input border border-border flex items-center justify-center text-base shrink-0">
                        👤
                      </div>
                      <span className="font-medium text-ink">{aluno.nome}</span>
                    </div>
                  </td>

                  {/* Presença */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePresenca(aluno.nome, "presente")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-bold transition-all duration-150
                          ${presencas[aluno.nome] === "presente"
                            ? "bg-green-500 text-white"
                            : "bg-surface-input text-ink-muted hover:bg-green-100 hover:text-green-700"
                          }`}
                      >
                        ✓ PRESENTE
                      </button>
                      <button
                        onClick={() => togglePresenca(aluno.nome, "ausente")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-bold transition-all duration-150
                          ${presencas[aluno.nome] === "ausente"
                            ? "bg-red-400 text-white"
                            : "bg-surface-input text-ink-muted hover:bg-red-100 hover:text-red-600"
                          }`}
                      >
                        ✕ AUSENTE
                      </button>
                    </div>
                  </td>

                  {/* Observações */}
                  <td className="px-6 py-4">
                    <input
                      placeholder="Sem observações..."
                      value={observacoes[aluno.nome]}
                      onChange={(e) => setObs(aluno.nome, e.target.value)}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rodapé com botão */}
          <div className="flex justify-end px-6 py-4 border-t border-border">
            {salvo ? (
              <span className="text-green-600 font-bold text-sm flex items-center gap-2">
                ✅ Chamada salva! Redirecionando…
              </span>
            ) : (
              <button
                onClick={handleSalvar}
                className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-8 py-3 rounded-btn transition-all duration-200 active:scale-95"
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