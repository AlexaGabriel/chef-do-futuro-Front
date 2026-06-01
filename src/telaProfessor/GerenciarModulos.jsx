import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cursosService from "../services/cursosService";

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
const NIVEIS = ["iniciante", "intermediario", "avancado"];

export default function GerenciarModulos() {
  const navigate = useNavigate();
  const professorId = localStorage.getItem("professorId") || "temp-professor-id";
  
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    imagemUrl: "",
    nivel: "iniciante",
    duracao: 40,
    professorId: professorId,
    categoria: "",
    tags: [],
    secoes: []
  });
  const [salvo, setSalvo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSalvar() {
    setLoading(true);
    setErro(null);
    
    try {
      await cursosService.criar(form);
      setSalvo(true);
      setTimeout(() => {
        setSalvo(false);
        navigate("/professor/dashboard");
      }, 1800);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
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
              Gerenciamento de Cursos
            </h2>

            {salvo ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <span className="text-5xl">✅</span>
                <p className="font-bold text-lg text-ink">Curso salvo com sucesso!</p>
                <p className="text-sm text-ink-muted">Redirecionando…</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {erro && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {erro}
                  </div>
                )}

                {/* Linha 1: Título */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Título do Curso
                  </label>
                  <input
                    placeholder="ex: Confeitaria Básica"
                    value={form.titulo}
                    onChange={set("titulo")}
                    className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                  />
                </div>

                {/* Linha 2: Descrição */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descrição do curso..."
                    value={form.descricao}
                    onChange={set("descricao")}
                    rows={3}
                    className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition resize-none"
                  />
                </div>

                {/* Linha 3: Nível + Duração */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Nível
                    </label>
                    <div className="relative">
                      <select
                        value={form.nivel}
                        onChange={set("nivel")}
                        className="select-custom w-full"
                      >
                        {NIVEIS.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Duração (horas)
                    </label>
                    <input
                      type="number"
                      value={form.duracao}
                      onChange={set("duracao")}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                </div>

                {/* Linha 4: Categoria + Imagem */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      Categoria
                    </label>
                    <input
                      placeholder="ex: Confeitaria"
                      value={form.categoria}
                      onChange={set("categoria")}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">
                      URL da Imagem
                    </label>
                    <input
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={form.imagemUrl}
                      onChange={set("imagemUrl")}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleSalvar}
                    disabled={loading}
                    className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-8 py-3.5 rounded-btn transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "SALVANDO..." : "SALVAR"}
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