import { useState, useEffect, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../services/authService";
import alunosService from "../services/alunosService";
import cursosService from "../services/cursosService";

// ─── Sidebar do Coordenador ───────────────────────────────────────────────────
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
  const navigate  = useNavigate();
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

// ─── Topnav do Coordenador ────────────────────────────────────────────────────
const NOTIFICACOES = [
  { texto: "Nova solicitação de aprovação de módulo pendente.", tempo: "Há 5 min" },
  { texto: "Prof. João enviou notas em atraso — auditoria iniciada.", tempo: "Há 30 min" },
  { texto: "3 alunos entraram na lista de espera de Confeitaria.", tempo: "Há 2 horas" },
];

function CoordenadorTopnav() {
  const [notifAberta, setNotifAberta] = useState(false);
  const user = useMemo(() => authService.getUser(), []);

  return (
    <header className="sticky top-0 z-50 h-16 bg-surface-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-sm">
      {/* Espaçador hamburger mobile */}
      <div className="w-10 lg:hidden" aria-hidden="true" />

      {/* Título da página */}
      <h1 className="font-display text-lg font-bold text-ink hidden sm:block">
        Visão Geral Institucional
      </h1>

      {/* Direita */}
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

        {/* Nome */}
        <span className="hidden md:block text-sm font-bold text-ink truncate max-w-[140px]">
          {user?.nome || "Coordenador"}
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-xl shrink-0" aria-hidden="true">
          👔
        </div>
      </div>
    </header>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KpiCard({ label, valor, destaque = false, sublabel }) {
  return (
    <div className="bg-surface-card rounded-card shadow-sm p-5 flex flex-col gap-1 min-w-0">
      <p className="text-xs text-ink-muted uppercase tracking-wider font-bold">{label}</p>
      <p className={`font-display text-3xl font-black ${destaque ? "text-brand" : "text-ink"}`}>
        {valor}
      </p>
      {sublabel && <p className="text-[11px] text-ink-faint">{sublabel}</p>}
    </div>
  );
}

// ─── Badge de status ─────────────────────────────────────────────────────────
const STATUS_STYLE = {
  Aguardando: "bg-yellow-100 text-yellow-700",
  Auditoria:  "bg-red-100 text-red-600",
  Novo:       "bg-green-100 text-green-700",
  Aprovado:   "bg-blue-100 text-blue-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ─── Dados estáticos (usados enquanto API não retorna) ────────────────────────
const PENDENCIAS = [
  {
    icone: "📄",
    descricao: "Validação de Horas Complementares — Aluno: Alice P.",
    status: "Aguardando",
  },
  {
    icone: "⚠️",
    descricao: "Envio de Notas em Atraso — Prof. João (Confeitaria B.)",
    status: "Auditoria",
  },
  {
    icone: "🛒",
    descricao: "Solicitação de Suprimentos Extras (Trufas) — Prof. Ana",
    status: "Novo",
  },
];

const OPERACOES = [
  "Cozinha 1: Massa (Prof. Ana) · 18h – 21h",
  "Substituição: Prof. Micael (Módulo Vegano)",
  "Auditoria de Equipamentos · Cozinha 3",
];

const AVISOS_OUVIDORIA = [
  "Feedback Baixo: Aluno reclama do forno na Cozinha 3",
  "Elogio: Excelente didática do Prof. Rodrigo no módulo de Panificação",
  "Sugestão: Aluno pede aulas de confeitaria árabe",
];

// ─── Componente principal ─────────────────────────────────────────────────────
export default function DashboardCoordenador() {
  const navigate = useNavigate();

  // ── Estado de dados da API ──
  const [kpis, setKpis] = useState({
    alunosAtivos: "—",
    riscoEvasao:  "—",
    listaEspera:  "—",
    capacidade:   "—",
  });
  const [pendencias, setPendencias]   = useState(PENDENCIAS);
  const [loadingKpis, setLoadingKpis] = useState(true);

  // ── Buscar dados reais ──
  useEffect(() => {
    async function carregarDados() {
      try {
        const [resAlunos, resCursos] = await Promise.allSettled([
          alunosService.listar({ limite: 1 }),
          cursosService.listar({ limite: 1 }),
        ]);

        const totalAlunos =
          resAlunos.status === "fulfilled"
            ? resAlunos.value?.total ?? resAlunos.value?.dados?.length ?? "—"
            : "—";

        setKpis((prev) => ({
          ...prev,
          alunosAtivos: typeof totalAlunos === "number"
            ? totalAlunos.toLocaleString("pt-BR")
            : totalAlunos,
        }));
      } catch (_) {
        // mantém fallback
      } finally {
        setLoadingKpis(false);
      }
    }
    carregarDados();
  }, []);

  // ── Modal de nova aula ──
  const [modalNovaAula, setModalNovaAula] = useState(false);
  const [novaAula, setNovaAula]           = useState({ titulo: "", professor: "", sala: "", horario: "" });
  const [novaAulaSalva, setNovaAulaSalva] = useState(false);

  function handleSalvarAula(e) {
    e.preventDefault();
    setNovaAulaSalva(true);
    setTimeout(() => {
      setModalNovaAula(false);
      setNovaAulaSalva(false);
      setNovaAula({ titulo: "", professor: "", sala: "", horario: "" });
    }, 1800);
  }

  // ── Aprovar / rejeitar pendência ──
  function handleAprovar(idx) {
    setPendencias((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, status: "Aprovado" } : p))
    );
  }

  function handleRejeitar(idx) {
    setPendencias((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex min-h-screen bg-surface font-body overflow-x-hidden">
      <CoordenadorSidebar />

      <div className="flex flex-col flex-1 min-w-0 w-full">
        <CoordenadorTopnav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* ── Ações rápidas ── */}
          <section className="animate-fade-up">
            <h2 className="text-base font-black text-ink-muted uppercase tracking-widest mb-3">
              Áulas Ações
            </h2>
            {/*
              Mobile:  1 coluna
              sm:      2 colunas
              lg:      4 colunas
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => setModalNovaAula(true)}
                className="flex items-center gap-3 px-4 py-4 bg-brand hover:bg-brand-dark text-white rounded-card
                           font-bold text-sm transition-all duration-200 shadow-sm active:scale-95 min-h-[56px]"
              >
                <span className="text-xl">＋</span>
                Criar Nova Aula
              </button>
              <button
                onClick={() => navigate("/coordenador/relatorios")}
                className="flex items-center gap-3 px-4 py-4 bg-surface-card border border-border hover:border-brand
                           hover:bg-surface-input text-ink rounded-card font-bold text-sm transition-all duration-200 shadow-sm min-h-[56px]"
              >
                <span className="text-xl">📄</span>
                Gerar Relatório Global
              </button>
              <button
                className="flex items-center gap-3 px-4 py-4 bg-surface-card border border-border hover:border-brand
                           hover:bg-surface-input text-ink rounded-card font-bold text-sm transition-all duration-200 shadow-sm min-h-[56px]"
              >
                <span className="text-xl">📢</span>
                Enviar Comunicado Institucional
              </button>
              <button
                onClick={() => navigate("/coordenador/professores")}
                className="flex items-center gap-3 px-4 py-4 bg-surface-card border border-border hover:border-brand
                           hover:bg-surface-input text-ink rounded-card font-bold text-sm transition-all duration-200 shadow-sm min-h-[56px]"
              >
                <span className="text-xl">📅</span>
                Gerenciar Cronograma Docente
              </button>
            </div>
          </section>

          {/* ── KPIs ── */}
          <section className="mt-6 animate-fade-up-1">
            {/*
              Mobile:  2 colunas
              lg:      4 colunas
            */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <KpiCard
                label="Alunos Ativos"
                valor={loadingKpis ? "…" : kpis.alunosAtivos !== "—" ? kpis.alunosAtivos : "1.250"}
              />
              <KpiCard
                label="Risco de Evasão"
                valor={loadingKpis ? "…" : "15"}
                destaque
                sublabel="Alunos identificados"
              />
              <KpiCard
                label="Capacidade da Cozinha"
                valor="88%"
                sublabel="Ocupação atual"
              />
              <KpiCard
                label="Lista de Espera Ativa"
                valor={loadingKpis ? "…" : "42"}
                sublabel="Aguardando vaga"
              />
            </div>
          </section>

          {/* ── Grid principal ── */}
          <section className="mt-6 animate-fade-up-2">
            {/*
              Mobile:  1 coluna
              lg:      3 colunas (2 + 1)
            */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

              {/* Central de Pendências e Aprovações — 2/3 */}
              <div className="lg:col-span-2 bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Central de Pendências e Aprovações
                  </h3>
                  <span className="text-xs text-ink-faint bg-surface-input px-2.5 py-1 rounded-full">
                    {pendencias.length} item{pendencias.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {pendencias.length === 0 ? (
                  <p className="text-sm text-ink-muted text-center py-8">
                    Nenhuma pendência no momento. ✅
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {pendencias.map((p, i) => (
                      <li
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 bg-surface-input
                                   border border-border rounded-btn px-4 py-3"
                      >
                        {/* Ícone + descrição */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-xl shrink-0 mt-0.5">{p.icone}</span>
                          <p className="text-sm text-ink leading-snug break-words">{p.descricao}</p>
                        </div>

                        {/* Status + ações */}
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          <StatusBadge status={p.status} />
                          {p.status !== "Aprovado" && (
                            <>
                              <button
                                onClick={() => handleAprovar(i)}
                                title="Aprovar"
                                className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-btn
                                           flex items-center justify-center text-sm transition active:scale-95"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleRejeitar(i)}
                                title="Rejeitar"
                                className="w-8 h-8 bg-red-400 hover:bg-red-500 text-white rounded-btn
                                           flex items-center justify-center text-sm transition active:scale-95"
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Coluna lateral — 1/3 */}
              <div className="flex flex-col gap-4 sm:gap-6">

                {/* Operações do Dia */}
                <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6">
                  <h3 className="font-display text-base font-bold text-ink mb-4">
                    Operações do Dia
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {OPERACOES.map((op, i) => (
                      <li
                        key={i}
                        className="text-xs text-ink-muted bg-surface-input rounded-btn px-3 py-2.5 leading-relaxed"
                      >
                        {op}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadro de Avisos — Ouvidoria */}
                <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex-1">
                  <h3 className="font-display text-base font-bold text-ink mb-4">
                    Quadro de Avisos<br />
                    <span className="font-body font-normal text-sm text-ink-muted">(Ouvidoria)</span>
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {AVISOS_OUVIDORIA.map((aviso, i) => (
                      <li key={i} className="text-xs text-ink-muted leading-relaxed border-b border-border pb-2 last:border-0 last:pb-0">
                        {aviso}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-xs font-bold text-brand hover:text-brand-dark transition">
                    Ver todos os avisos →
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* ── KPIs complementares ── */}
          <section className="mt-6 animate-fade-up-3">
            {/*
              Mobile:  1 coluna
              sm:      3 colunas
            */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Engajamento geral */}
              <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-muted uppercase tracking-wider font-bold mb-1">
                    Engajamento Geral
                  </p>
                  <p className="font-display text-3xl font-black text-ink">
                    91% <span className="text-brand text-xl">↗</span>
                  </p>
                  <p className="text-xs text-ink-muted mt-1">Média institucional</p>
                </div>
                <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0" aria-hidden="true">
                  <circle cx="28" cy="28" r="20" fill="none" stroke="#e0d9cf" strokeWidth="7" />
                  <circle
                    cx="28" cy="28" r="20" fill="none" stroke="#c0522a" strokeWidth="7"
                    strokeDasharray={`${2 * Math.PI * 20 * 0.91} ${2 * Math.PI * 20 * 0.09}`}
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                  />
                </svg>
              </div>

              {/* Cursos ativos */}
              <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-muted uppercase tracking-wider font-bold mb-1">
                    Cursos Ativos
                  </p>
                  <p className="font-display text-3xl font-black text-ink">24</p>
                  <p className="text-xs text-ink-muted mt-1">Em andamento este semestre</p>
                </div>
                <div className="flex items-end gap-1 h-12 shrink-0" aria-hidden="true">
                  {[40, 60, 55, 75, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-sm"
                      style={{ height: `${h}%`, backgroundColor: i === 5 ? "#c0522a" : "#e0d9cf" }}
                    />
                  ))}
                </div>
              </div>

              {/* Taxa de conclusão */}
              <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-muted uppercase tracking-wider font-bold mb-1">
                    Taxa de Conclusão
                  </p>
                  <p className="font-display text-3xl font-black text-ink">
                    78% <span className="text-green-500 text-xl">↗</span>
                  </p>
                  <p className="text-xs text-ink-muted mt-1">Alunos que concluíram cursos</p>
                </div>
                <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0" aria-hidden="true">
                  <circle cx="28" cy="28" r="20" fill="none" stroke="#e0d9cf" strokeWidth="7" />
                  <circle
                    cx="28" cy="28" r="20" fill="none" stroke="#22c55e" strokeWidth="7"
                    strokeDasharray={`${2 * Math.PI * 20 * 0.78} ${2 * Math.PI * 20 * 0.22}`}
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                  />
                </svg>
              </div>

            </div>
          </section>

        </main>
      </div>

      {/* ── Modal: Criar Nova Aula ── */}
      {modalNovaAula && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setModalNovaAula(false)}
        >
          <div
            className="bg-surface-card rounded-card shadow-card p-6 sm:p-8 w-full max-w-md animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold text-ink mb-5">Criar Nova Aula</h3>

            {novaAulaSalva ? (
              <div className="text-center py-8 flex flex-col items-center gap-3">
                <span className="text-5xl">✅</span>
                <p className="font-bold text-ink">Aula criada com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={handleSalvarAula} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Título da Aula
                  </label>
                  <input
                    required
                    placeholder="Ex: Técnicas de Confeitaria Avançada"
                    value={novaAula.titulo}
                    onChange={(e) => setNovaAula((p) => ({ ...p, titulo: e.target.value }))}
                    className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm
                               text-ink placeholder:text-ink-faint outline-none focus:border-brand
                               focus:ring-2 focus:ring-brand/20 transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink uppercase tracking-wide">
                    Professor Responsável
                  </label>
                  <input
                    required
                    placeholder="Nome do professor"
                    value={novaAula.professor}
                    onChange={(e) => setNovaAula((p) => ({ ...p, professor: e.target.value }))}
                    className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm
                               text-ink placeholder:text-ink-faint outline-none focus:border-brand
                               focus:ring-2 focus:ring-brand/20 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">Sala</label>
                    <input
                      placeholder="Ex: Cozinha A1"
                      value={novaAula.sala}
                      onChange={(e) => setNovaAula((p) => ({ ...p, sala: e.target.value }))}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm
                                 text-ink placeholder:text-ink-faint outline-none focus:border-brand
                                 focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wide">Horário</label>
                    <input
                      type="time"
                      value={novaAula.horario}
                      onChange={(e) => setNovaAula((p) => ({ ...p, horario: e.target.value }))}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm
                                 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalNovaAula(false)}
                    className="flex-1 bg-surface-input border border-border text-ink font-bold text-sm
                               py-3 rounded-btn hover:bg-border transition min-h-[44px]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-brand hover:bg-brand-dark text-white font-bold text-sm
                               py-3 rounded-btn transition active:scale-95 min-h-[44px]"
                  >
                    Criar Aula
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
