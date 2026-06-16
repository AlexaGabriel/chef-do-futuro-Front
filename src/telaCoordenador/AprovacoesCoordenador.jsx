import { useState, useEffect, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService    from "../services/authService";
import alunosService  from "../services/alunosService";
import cursosService  from "../services/cursosService";

// ─── Sidebar do Coordenador (idêntica ao Dashboard) ───────────────────────────
const NAV_ITEMS = [
  { label: "Painel",          icon: "🏠", to: "/coordenador/dashboard" },
  { label: "Aulas & Módulos", icon: "📁", to: "/coordenador/aulas" },
  { label: "Professores",     icon: "👥", to: "/coordenador/professores" },
  { label: "Alunos",          icon: "👤", to: "/coordenador/alunos" },
  { label: "Aprovações",      icon: "✅", to: "/coordenador/aprovacoes" },
  { label: "Relatórios",      icon: "📊", to: "/coordenador/relatorios" },
  { label: "Configurações",   icon: "⚙️", to: "/coordenador/configuracoes" },
];

function CoordenadorSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useMemo(() => authService.getUser(), []);

  function handleLogout() {
    authService.logout();
    navigate("/login");
  }

  return (
    <>
      {/* ── Mobile: Hamburger ── */}
      <button
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((p) => !p)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5
                   bg-sidebar rounded-btn shadow-card"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ── Mobile: Overlay ── */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-sidebar flex flex-col
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-56 lg:shrink-0 lg:min-h-screen
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 mb-4">
          <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center text-lg shrink-0">
            🍳
          </div>
          <span className="font-body text-white text-sm font-black tracking-wide whitespace-nowrap">
            Escola Chef do Futuro
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 flex-1" aria-label="Menu do coordenador">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-3 rounded-btn text-sm font-body transition-all duration-150 min-h-[44px]
                 ${isActive
                   ? "bg-brand text-white font-bold"
                   : "text-white/60 hover:text-white hover:bg-white/[.06]"
                 }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Perfil do coordenador */}
        <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-base shrink-0" aria-hidden="true">
            👔
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate">
              {user?.nome || "Coordenador"}
            </p>
            <button
              onClick={handleLogout}
              className="text-white/40 hover:text-white/70 text-[11px] transition-colors duration-150"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Topnav do Coordenador (idêntica ao Dashboard) ───────────────────────────
const NOTIFICACOES = [
  { texto: "Nova solicitação de aprovação de módulo pendente.", tempo: "Há 5 min" },
  { texto: "Prof. João enviou notas em atraso — auditoria iniciada.", tempo: "Há 30 min" },
  { texto: "3 alunos entraram na lista de espera de Confeitaria.", tempo: "Há 2 horas" },
];

function CoordenadorTopnav({ titulo = "Aprovações Pendentes" }) {
  const [notifAberta, setNotifAberta] = useState(false);
  const user = useMemo(() => authService.getUser(), []);

  return (
    <header className="sticky top-0 z-50 h-16 bg-surface-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-sm">
      <div className="w-10 lg:hidden" aria-hidden="true" />

      <h1 className="font-display text-lg font-bold text-ink hidden sm:block">
        {titulo}
      </h1>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notificações */}
        <div className="relative">
          <button
            onClick={() => setNotifAberta((o) => !o)}
            aria-label="Notificações"
            aria-expanded={notifAberta}
            className="text-ink-muted hover:text-ink text-xl transition w-10 h-10 flex items-center justify-center"
          >
            🔔
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-white text-[9px] flex items-center justify-center font-bold">
            {NOTIFICACOES.length}
          </span>

          {notifAberta && (
            <div className="absolute right-0 top-12 w-screen max-w-xs sm:w-80 bg-surface-card rounded-card shadow-card border border-border z-50 overflow-hidden">
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

        <span className="hidden md:block text-sm font-bold text-ink truncate max-w-[140px]">
          {user?.nome || "Coordenador"}
        </span>

        <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-xl shrink-0" aria-hidden="true">
          👔
        </div>
      </div>
    </header>
  );
}

// ─── Avatar com inicial ───────────────────────────────────────────────────────
function Avatar({ nome }) {
  const inicial = nome?.trim()?.[0]?.toUpperCase() || "?";
  return (
    <div className="w-11 h-11 rounded-full bg-surface-input border border-border flex items-center justify-center shrink-0">
      <span className="font-display font-bold text-ink text-base">{inicial}</span>
    </div>
  );
}

// ─── Badge do curso ───────────────────────────────────────────────────────────
function CursoBadge({ texto }) {
  return (
    <span className="text-xs font-bold px-3 py-1.5 rounded-full border border-brand/40 text-brand bg-brand/5 whitespace-nowrap">
      {texto}
    </span>
  );
}

// ─── Toast de feedback ────────────────────────────────────────────────────────
function Toast({ msg, tipo }) {
  if (!msg) return null;
  const cores = {
    sucesso: "bg-green-50 border-green-300 text-green-700",
    erro:    "bg-red-50 border-red-200 text-red-700",
    info:    "bg-blue-50 border-blue-200 text-blue-700",
  };
  return (
    <div className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto z-50 px-5 py-3 rounded-card border shadow-card text-sm font-bold animate-fade-up ${cores[tipo] || cores.info}`}>
      {msg}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AprovacoesCoordenador() {
  const [alunos,       setAlunos]       = useState([]);
  const [cursos,       setCursos]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [erro,         setErro]         = useState(null);
  const [processando,  setProcessando]  = useState({}); // { [id]: true }
  const [toast,        setToast]        = useState({ msg: "", tipo: "" });
  const [busca,        setBusca]        = useState("");
  const [confirmacao,  setConfirmacao]  = useState(null); // { aluno, acao }

  // ── Buscar dados ──
  useEffect(() => {
    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const [resAlunos, resCursos] = await Promise.allSettled([
          alunosService.listar({ status: "pendente", limite: 50 }),
          cursosService.listar({ limite: 50 }),
        ]);

        if (resAlunos.status === "fulfilled") {
          const dados = resAlunos.value?.dados ?? resAlunos.value ?? [];
          setAlunos(Array.isArray(dados) ? dados : []);
        } else {
          // fallback ilustrativo enquanto API não retorna pendentes
          setAlunos([
            { _id: "1", nome: "Mariana Souza",  email: "mariana.souza@email.com",  createdAt: new Date().toISOString(), nivelCulinaria: "iniciante" },
            { _id: "2", nome: "Liam Chen",      email: "liam.chen@email.com",      createdAt: new Date().toISOString(), nivelCulinaria: "intermediario" },
            { _id: "3", nome: "Sofia Rodriguez",email: "sofia.rodriguez@email.com", createdAt: new Date().toISOString(), nivelCulinaria: "avancado" },
            { _id: "4", nome: "Kenji Tanaka",   email: "kenji.tanaka@email.com",   createdAt: new Date().toISOString(), nivelCulinaria: "iniciante" },
          ]);
        }

        if (resCursos.status === "fulfilled") {
          const dados = resCursos.value?.dados ?? resCursos.value ?? [];
          setCursos(Array.isArray(dados) ? dados : []);
        }
      } catch (_) {
        setErro("Não foi possível carregar as aprovações pendentes.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  // ── Helpers ──
  function exibirToast(msg, tipo = "sucesso") {
    setToast({ msg, tipo });
    setTimeout(() => setToast({ msg: "", tipo: "" }), 3000);
  }

  function cursoDoPrimeiroCurso(aluno) {
    // tenta achar um curso pela turma ou exibe o nível como fallback
    const turma = aluno.turmas?.[0];
    if (turma) {
      const curso = cursos.find((c) => c._id === turma || c.titulo === turma);
      if (curso) return curso.titulo;
    }
    const nivelLabel = {
      iniciante:     "Culinária Iniciante",
      intermediario: "Culinária Intermediária",
      avancado:      "Culinária Avançada",
    };
    return nivelLabel[aluno.nivelCulinaria] || "Curso Pendente";
  }

  function formatarData(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric",
    });
  }

  // ── Aprovar ──
  async function aprovar(aluno) {
    setConfirmacao(null);
    setProcessando((p) => ({ ...p, [aluno._id]: true }));
    try {
      await alunosService.atualizar(aluno._id, { status: "ativo" });
      setAlunos((prev) => prev.filter((a) => a._id !== aluno._id));
      exibirToast(`✅ ${aluno.nome} aprovado com sucesso!`, "sucesso");
    } catch (err) {
      exibirToast(err.message || "Erro ao aprovar aluno.", "erro");
    } finally {
      setProcessando((p) => ({ ...p, [aluno._id]: false }));
    }
  }

  // ── Rejeitar ──
  async function rejeitar(aluno) {
    setConfirmacao(null);
    setProcessando((p) => ({ ...p, [aluno._id]: true }));
    try {
      await alunosService.atualizar(aluno._id, { status: "inativo" });
      setAlunos((prev) => prev.filter((a) => a._id !== aluno._id));
      exibirToast(`🚫 ${aluno.nome} rejeitado.`, "info");
    } catch (err) {
      exibirToast(err.message || "Erro ao rejeitar aluno.", "erro");
    } finally {
      setProcessando((p) => ({ ...p, [aluno._id]: false }));
    }
  }

  // ── Filtro por busca ──
  const alunosFiltrados = alunos.filter((a) => {
    const q = busca.toLowerCase();
    return (
      a.nome?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
    );
  });

  // ── Render ──
  return (
    <div className="flex min-h-screen bg-surface font-body overflow-x-hidden">
      <CoordenadorSidebar />

      <div className="flex flex-col flex-1 min-w-0 w-full">
        <CoordenadorTopnav titulo="Aprovações Pendentes" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* ── Cabeçalho da seção ── */}
          <section className="animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-bold text-ink">
                  Aprovações Pendentes
                </h2>
                {!loading && (
                  <span className="bg-brand text-white text-xs font-black px-3 py-1 rounded-full">
                    {String(alunosFiltrados.length).padStart(2, "0")} pendente{alunosFiltrados.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Busca */}
              <div className="relative w-full sm:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar por nome ou e-mail…"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full bg-surface-card border border-border rounded-btn
                             pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint
                             outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                />
              </div>
            </div>

            {/* ── Estados: loading / erro / vazio / lista ── */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-ink-muted animate-pulse">
                <span className="text-4xl">⏳</span>
                <p className="text-sm">Carregando solicitações…</p>
              </div>

            ) : erro ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-card text-sm">
                {erro}
              </div>

            ) : alunosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-ink-muted">
                <span className="text-5xl">✅</span>
                <p className="font-bold text-base text-ink">Nenhuma aprovação pendente</p>
                <p className="text-sm">
                  {busca ? "Nenhum aluno encontrado para essa busca." : "Todas as solicitações foram processadas."}
                </p>
              </div>

            ) : (
              <ul className="flex flex-col gap-3">
                {alunosFiltrados.map((aluno) => {
                  const ocupado = processando[aluno._id];
                  return (
                    <li
                      key={aluno._id}
                      className="bg-surface-card border border-border rounded-card shadow-sm
                                 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4
                                 transition hover:border-brand/30 hover:shadow-md"
                    >
                      {/* Avatar + info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Avatar nome={aluno.nome} />
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-ink truncate">{aluno.nome}</p>
                          <p className="text-xs text-ink-muted truncate">{aluno.email}</p>
                          <p className="text-[11px] text-ink-faint mt-0.5">
                            Solicitado em: {formatarData(aluno.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Badge do curso */}
                      <div className="shrink-0">
                        <CursoBadge texto={cursoDoPrimeiroCurso(aluno)} />
                      </div>

                      {/* Botões */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        <button
                          onClick={() => setConfirmacao({ aluno, acao: "rejeitar" })}
                          disabled={ocupado}
                          className="px-4 py-2 min-h-[38px] rounded-btn border border-border
                                     text-sm font-bold text-ink-muted
                                     hover:border-red-300 hover:text-red-600 hover:bg-red-50
                                     disabled:opacity-40 transition active:scale-95"
                        >
                          {ocupado ? "…" : "Rejeitar"}
                        </button>

                        <button
                          onClick={() => setConfirmacao({ aluno, acao: "aprovar" })}
                          disabled={ocupado}
                          className="px-4 py-2 min-h-[38px] rounded-btn
                                     bg-brand hover:bg-brand-dark text-white
                                     text-sm font-bold
                                     disabled:opacity-40 transition active:scale-95
                                     flex items-center gap-1.5"
                        >
                          {ocupado ? "…" : <><span>✓</span> Aprovar Aluno</>}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </main>
      </div>

      {/* ── Modal de confirmação ── */}
      {confirmacao && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setConfirmacao(null)}
        >
          <div
            className="bg-surface-card rounded-card shadow-card p-6 sm:p-8 w-full max-w-sm animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-3 text-center mb-6">
              <span className="text-4xl">
                {confirmacao.acao === "aprovar" ? "✅" : "🚫"}
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                {confirmacao.acao === "aprovar" ? "Aprovar aluno?" : "Rejeitar aluno?"}
              </h3>
              <p className="text-sm text-ink-muted">
                {confirmacao.acao === "aprovar"
                  ? `${confirmacao.aluno.nome} terá acesso à plataforma após a aprovação.`
                  : `${confirmacao.aluno.nome} será marcado como inativo e não poderá acessar a plataforma.`
                }
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmacao(null)}
                className="flex-1 bg-surface-input border border-border text-ink font-bold text-sm
                           py-3 rounded-btn hover:bg-border transition min-h-[44px]"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  confirmacao.acao === "aprovar"
                    ? aprovar(confirmacao.aluno)
                    : rejeitar(confirmacao.aluno)
                }
                className={`flex-1 text-white font-bold text-sm py-3 rounded-btn transition active:scale-95 min-h-[44px]
                  ${confirmacao.acao === "aprovar"
                    ? "bg-brand hover:bg-brand-dark"
                    : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {confirmacao.acao === "aprovar" ? "Sim, aprovar" : "Sim, rejeitar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      <Toast msg={toast.msg} tipo={toast.tipo} />
    </div>
  );
}
