import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Sidebar com ícones ────────────────────────────────────────────────────────
const SIDEBAR_ICONS = [
  { icon: "⊞",  to: "/professor/dashboard" },
  { icon: "📖", to: "/professor/cursos" },
  { icon: "🎓", to: "/professor/alunos" },
  { icon: "⚙️", to: "/professor/configuracoes" },
];

function IconSidebar({ active = 1 }) {
  const navigate = useNavigate();
  return (
    <aside className="w-14 shrink-0 min-h-screen bg-sidebar flex flex-col items-center py-5 gap-5">
      {SIDEBAR_ICONS.map((item, i) => (
        <button
          key={i}
          onClick={() => navigate(item.to)}
          className={`w-10 h-10 rounded-btn flex items-center justify-center text-lg transition-all duration-150
            ${active === i
              ? "bg-brand text-white"
              : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
const PERIODOS = ["Manhã", "Tarde", "Noite", "Manhã/Noite", "Tarde/Noite"];

export default function GerenciarModulos() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    modulo: "",
    aula: "",
    periodo: "Manhã/Noite",
    maxAlunos: 20,
    dataInicio: "01/01/2026",
    materiais: "",
  });
  const [salvo, setSalvo] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSalvar() {
    setSalvo(true);
    setTimeout(() => {
      setSalvo(false);
      navigate("/professor/dashboard");
    }, 1800);
  }

  return (
    <div className="flex min-h-screen bg-surface font-body">
      <IconSidebar active={1} />

      <div className="flex flex-col flex-1 min-w-0">

        {/* Topnav */}
        <header className="h-14 bg-surface-card border-b border-border flex items-center justify-between px-8 shrink-0">
          <nav className="flex items-center gap-6">
            {[
              { label: "Dashboard",      to: "/professor/dashboard" },
              { label: "Cursos",         to: "/professor/cursos",   active: true },
              { label: "Alunos",         to: "/professor/alunos" },
              { label: "Configurações",  to: "/professor/configuracoes" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className={`flex items-center gap-1.5 text-sm transition-colors duration-150
                  ${item.active ? "text-ink font-bold" : "text-ink-muted hover:text-ink"}`}
              >
                {item.label === "Dashboard" && <span>🏠</span>}
                {item.label === "Cursos"    && <span>📖</span>}
                {item.label === "Alunos"    && <span>👥</span>}
                {item.label === "Configurações" && <span>⚙️</span>}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-input border border-border flex items-center justify-center text-ink-muted text-base">
              👤
            </div>
            <span className="text-sm font-bold text-ink">Admin</span>
            <button className="text-ink-muted hover:text-ink text-xl transition">🔔</button>
          </div>
        </header>

        {/* Área central */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-surface-card rounded-card shadow-card w-full max-w-2xl p-10 animate-fade-up">

            <h2 className="font-display text-2xl font-bold text-ink mb-8">
              Gerenciamento de Módulos e Aulas
            </h2>

            {salvo ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <span className="text-5xl">✅</span>
                <p className="font-bold text-lg text-ink">Módulo salvo com sucesso!</p>
                <p className="text-sm text-ink-muted">Redirecionando…</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">

                {/* Linha 1: Módulo + Aula */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Nome do Módulo
                    </label>
                    <input
                      placeholder="ex: Confeitaria Básica"
                      value={form.modulo}
                      onChange={set("modulo")}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Nome da Aula
                    </label>
                    <input
                      placeholder="ex: Aula 03"
                      value={form.aula}
                      onChange={set("aula")}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                </div>

                {/* Linha 2: Período + Máx. alunos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Período
                    </label>
                    <div className="relative">
                      <select
                        value={form.periodo}
                        onChange={set("periodo")}
                        className="select-custom w-full"
                      >
                        {PERIODOS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Número máximo de alunos
                    </label>
                    <div className="flex items-stretch border border-border rounded-btn overflow-hidden bg-surface-input">
                      <input
                        type="number"
                        value={form.maxAlunos}
                        onChange={set("maxAlunos")}
                        className="flex-1 bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-brand transition"
                      />
                      <div className="flex flex-col border-l border-border">
                        <button
                          onClick={() => setForm((p) => ({ ...p, maxAlunos: p.maxAlunos + 1 }))}
                          className="flex-1 px-3 text-ink-muted hover:text-ink hover:bg-surface-input transition text-xs font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => setForm((p) => ({ ...p, maxAlunos: Math.max(1, p.maxAlunos - 1) }))}
                          className="flex-1 px-3 text-ink-muted hover:text-ink hover:bg-surface-input transition text-xs font-bold border-t border-border"
                        >
                          −
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linha 3: Data de Início */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Data de Início
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-base">📅</span>
                    <input
                      type="text"
                      placeholder="DD/MM/AAAA"
                      value={form.dataInicio}
                      onChange={set("dataInicio")}
                      className="w-full bg-surface-input border border-border rounded-btn pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                </div>

                {/* Linha 4: Materiais */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Lista de materiais necessários
                  </label>
                  <textarea
                    placeholder="Dólmã do Chef, Fouet..."
                    value={form.materiais}
                    onChange={set("materiais")}
                    rows={4}
                    className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition resize-none"
                  />
                </div>

                {/* Botões */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleSalvar}
                    className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-8 py-3.5 rounded-btn transition-all duration-200 active:scale-95"
                  >
                    SALVAR
                  </button>
                  <button
                    onClick={() => navigate("/professor/dashboard")}
                    className="bg-transparent border border-border text-ink hover:bg-surface-input font-bold text-sm px-8 py-3.5 rounded-btn transition-all duration-200"
                  >
                    CANCELAR
                  </button>
                </div>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}