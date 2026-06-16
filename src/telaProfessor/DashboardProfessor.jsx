import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/ui/Icon";

// ── Sidebar do Professor ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Painel",          icon: "home",            to: "/professor/dashboard" },
  { label: "Cursos",          icon: "book",            to: "/professor/cursos" },
  { label: "Alunos",          icon: "users",           to: "/professor/alunos" },
  { label: "Turmas",          icon: "graduation-cap",  to: "/professor/turmas" },
  { label: "Horários",        icon: "calendar",        to: "/professor/horarios" },
  { label: "Lista de Espera", icon: "clock",           to: "/professor/lista-espera" },
  { label: "Relatórios",      icon: "bar-chart",       to: "/professor/relatorios" },
];

function ProfessorSidebar({ activeLabel = "Painel" }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
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

      {/* Overlay */}
      {isOpen && (
        <div aria-hidden="true" onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 z-30 bg-black/50" />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-sidebar flex flex-col
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-52 lg:shrink-0 lg:min-h-screen
        `}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 mb-4">
          <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center shrink-0">
            <Icon name="chef-hat" size={18} className="text-white" />
          </div>
          <span className="font-display text-white text-sm leading-tight">Escola<br />Chef do Futuro</span>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1" aria-label="Menu do professor">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => { navigate(item.to); setIsOpen(false); }}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-btn text-sm font-body transition-all duration-150 w-full text-left min-h-[44px]
                ${activeLabel === item.label
                  ? "bg-brand text-white font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[.06]"
                }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2.5 px-3 py-3 w-full min-h-[44px] rounded-btn text-sm text-white/40 hover:text-white/70 hover:bg-white/[.06] transition-all duration-150"
          >
            <Icon name="log-out" size={18} /> Sair
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Dados fictícios ────────────────────────────────────────────────────────────
const TAREFAS = [
  {
    cor: "red",
    badge: "FALTAM 2 DIAS:",
    titulo: 'Finalizar Lançamento de Notas para "Artes de Confeitaria Avançada".',
    descricao: "Revisão pendente para 28 notas de alunos antes que o sistema bloqueie.",
    progresso: 85,
  },
  {
    cor: "green",
    badge: "APROVAÇÕES:",
    titulo: "3 Novos Pedidos de Atualização Curricular",
    descricao: 'Pedidos para "Módulo de Cozinha Italiana" e "Técnicas Modernistas" precisam de aprovação.',
    progresso: null,
  },
  {
    cor: "yellow",
    badge: "ITENS PENDENTES NA SALA DE AULA:",
    titulo: 'Verificação de Equipamentos para "Fundamentos Culinários 101"',
    descricao: "Verificar inventário e status funcional de todas as estações de cozinha antes da aula de amanhã.",
    progresso: null,
  },
];

const RESUMO_DIA = [
  { hora: "07:30 AM", desc: "Aula 05: Técnicas Francesas - Sala A101" },
  { hora: "09:00 AM", desc: "Sessão de Mentoria de Aluno: Laura C. - Escritório" },
  { hora: "11:00 AM", desc: "Reunião de Departamento - Sala de Conferência B" },
  { hora: "14:00 PM", desc: "Aula 06: Introdução à Panificação - Sala A102" },
  { hora: "16:30 PM", desc: "Revisão de Inventário da Cozinha - Cozinha Principal" },
];

const MENSAGENS = [
  { tipo: "Nova Mensagem", origem: "Escritório do Diretor", assunto: "Referente à Próxima Visita de Credenciamento.", tempo: "Há 1 hora" },
  { tipo: "Aviso", origem: "Departamento de TI", assunto: "Manutenção Programada do Sistema no Sábado.", tempo: "Há 3 horas" },
  { tipo: "Nova Mensagem", origem: "Chef Thomas", assunto: 'Colaboração no Material do Curso "Cozinhas Regionais".', tempo: "Há 5 horas" },
  { tipo: "Anúncio", origem: "RH", assunto: "Novo Processo de Integração de Professores Atualizado.", tempo: "Ontem" },
];

const COR_TAREFA = {
  red:    { border: "border-l-red-400",    bg: "bg-red-50",    badge: "text-red-600" },
  green:  { border: "border-l-green-400",  bg: "bg-green-50",  badge: "text-green-700" },
  yellow: { border: "border-l-yellow-400", bg: "bg-yellow-50", badge: "text-yellow-700" },
};

// ── Componente principal ───────────────────────────────────────────────────────
export default function ProfessorDashboard() {
  const navigate = useNavigate();
  const nomeProfessor = localStorage.getItem("professorNome") || "Professor";

  return (
    <div className="flex min-h-screen bg-surface font-body overflow-x-hidden">
      <ProfessorSidebar activeLabel="Painel" />

      <div className="flex flex-col flex-1 min-w-0 w-full">
        {/* Topnav */}
        <header className="h-16 bg-surface-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-sm">
          {/* Espaçador para o hamburger em mobile */}
          <div className="w-10 lg:hidden" aria-hidden="true" />

          {/* Busca — escondida em mobile pequeno, visível em sm+ */}
          <div className="relative hidden sm:block w-full max-w-xs">
            <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              placeholder="Pesquisar cursos, alunos..."
              className="w-full bg-surface-input border border-border rounded-btn pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
            />
          </div>

          {/* Perfil */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div className="relative">
              <button aria-label="Notificações" className="text-ink-muted hover:text-ink transition w-10 h-10 flex items-center justify-center">
                <Icon name="bell" size={20} />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
            </div>
            <span className="hidden md:block text-sm font-bold text-ink truncate max-w-[120px]">{nomeProfessor}</span>
            <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center shrink-0" aria-hidden="true">
              <Icon name="chef-hat" size={16} className="text-ink" />
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* Botões de ação
              Mobile:  1 coluna
              sm:      3 colunas
          */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-up">
            <button
              onClick={() => navigate("/professor/frequencia")}
              className="bg-surface-card border border-border rounded-btn py-3.5 sm:py-4 text-sm font-bold text-ink
                         hover:bg-surface-input hover:border-brand transition-all duration-200 shadow-sm min-h-[44px]"
            >
              Registrar Frequência
            </button>
            <button className="bg-surface-card border border-border rounded-btn py-3.5 sm:py-4 text-sm font-bold text-ink
                               hover:bg-surface-input hover:border-brand transition-all duration-200 shadow-sm min-h-[44px]">
              Lançar Notas
            </button>
            <button className="bg-brand hover:bg-brand-dark rounded-btn py-3.5 sm:py-4 text-sm font-bold text-white
                               transition-all duration-200 shadow-sm min-h-[44px]">
              Enviar Comunicado
            </button>
          </div>

          {/* Grid principal
              Mobile:  1 coluna
              lg:      2 colunas
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-up-1">

            {/* Tarefas Críticas */}
            <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-ink">Tarefas Críticas e a Fazer</h3>
              {TAREFAS.map((t, i) => {
                const c = COR_TAREFA[t.cor];
                return (
                  <div key={i} className={`border-l-4 ${c.border} ${c.bg} rounded-r-btn p-3 sm:p-4 flex flex-col gap-1.5`}>
                    <p className="text-xs font-black break-words">
                      <span className={c.badge}>{t.badge}</span>{" "}
                      <span className="text-ink">{t.titulo}</span>
                    </p>
                    <p className="text-xs text-ink-muted leading-relaxed">{t.descricao}</p>
                    {t.progresso !== null && (
                      <div className="mt-1">
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-brand rounded-full" style={{ width: `${t.progresso}%` }} />
                        </div>
                        <p className="text-right text-[10px] text-ink-faint mt-0.5">{t.progresso}%</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col gap-4 sm:gap-6">

              {/* Resumo do Dia */}
              <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6">
                <h3 className="font-display text-lg font-bold text-ink mb-4">Resumo do Dia</h3>
                <ul className="flex flex-col gap-3">
                  {RESUMO_DIA.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-2 h-2 rounded-full bg-ink-faint mt-1.5 shrink-0" aria-hidden="true" />
                      <span className="break-words min-w-0">
                        <span className="font-bold text-ink">{item.hora}</span>
                        <span className="text-ink-muted"> - {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Centro de Comunicação */}
              <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex-1">
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-ink">Centro de Comunicação</h3>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted bg-surface-input px-2.5 py-1 rounded-full whitespace-nowrap">
                    ✉️ 3 novas mensagens
                  </span>
                </div>
                <ul className="flex flex-col gap-3">
                  {MENSAGENS.map((m, i) => (
                    <li key={i} className="text-xs leading-relaxed border-b border-border pb-2 last:border-0 last:pb-0 break-words">
                      <span className="font-bold text-ink">{m.tipo}:</span>{" "}
                      <span className="text-ink-muted">{m.origem} - {m.assunto}</span>{" "}
                      <span className="text-ink-faint">Recebido: {m.tempo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* KPIs
              Mobile:  1 coluna
              sm:      2 colunas
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-6 animate-fade-up-2">
            {/* Termômetro da Turma */}
            <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink-muted uppercase tracking-wider font-bold mb-1">Termômetro da Turma</p>
                <p className="font-display text-3xl sm:text-4xl font-black text-ink">
                  85% <span className="text-brand text-xl sm:text-2xl">↗</span>
                </p>
                <p className="text-xs text-ink-muted mt-1">Pontuação Média de Engajamento do Aluno</p>
              </div>
              <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0" aria-hidden="true">
                <circle cx="32" cy="32" r="24" fill="none" stroke="#e0d9cf" strokeWidth="8" />
                <circle
                  cx="32" cy="32" r="24" fill="none" stroke="#c0522a" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 24 * 0.85} ${2 * Math.PI * 24 * 0.15}`}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                />
              </svg>
            </div>

            {/* Alerta de Evasão */}
            <div className="bg-surface-card rounded-card shadow-sm p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink-muted uppercase tracking-wider font-bold mb-1">Alerta de Evasão</p>
                <p className="font-display text-3xl sm:text-4xl font-black text-ink">04</p>
                <p className="text-xs text-ink-muted mt-1">Alunos em Risco Identificados</p>
              </div>
              <div className="flex items-end gap-1 h-12 shrink-0" aria-hidden="true">
                {[30, 55, 40, 70, 50, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm"
                    style={{ height: `${h}%`, backgroundColor: i === 5 ? "#c0522a" : "#e0d9cf" }}
                  />
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
