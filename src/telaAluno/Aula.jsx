import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav           from "../components/layout/Topnav";
import SectionAccordion from "../components/curso/SectionAccordion";

const SECOES = [
  {
    titulo: "SEÇÃO 1: BOAS-VINDAS",
    defaultOpen: true,
    licoes: [
      { nome: "Lição 1.1: Introdução à Confeitaria", concluida: true,  atual: false, bloqueada: false },
      { nome: "Lição 1.2: Higiene e Segurança",      concluida: false, atual: true,  bloqueada: false },
      { nome: "Lição 1.3: Lições não assistidas",    concluida: false, atual: false, bloqueada: true  },
    ],
  },
  {
    titulo: "SEÇÃO 2: MASSAS BÁSICAS E RECHEIOS",
    licoes: [
      { nome: "Lição 2.1: Tipos de Farinha",         concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 2.2: Massas Folhadas",          concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 2.3: Recheios Cremosos",        concluida: false, atual: false, bloqueada: true },
    ],
  },
  {
    titulo: "SEÇÃO 3: COBERTURAS E DECORAÇÃO",
    licoes: [
      { nome: "Lição 3.1: Glacê Real",               concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 3.2: Chantilly Perfeito",       concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 3.3: Decoração com Bico",       concluida: false, atual: false, bloqueada: true },
    ],
  },
  {
    titulo: "SEÇÃO 4: RECHEIOS BÁSICOS",
    licoes: [
      { nome: "Lição 4.1: Brigadeiro Gourmet",       concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 4.2: Ganache de Chocolate",     concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 4.3: Creme de Confeiteiro",     concluida: false, atual: false, bloqueada: true },
    ],
  },
  {
    titulo: "SEÇÃO 5: TÉCNICAS AVANÇADAS",
    licoes: [
      { nome: "Lição 5.1: Temperagem de Chocolate",  concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 5.2: Açúcar Puxado",            concluida: false, atual: false, bloqueada: true },
      { nome: "Lição 5.3: Montagem de Bolos",        concluida: false, atual: false, bloqueada: true },
    ],
  },
];

const ABAS = ["Visão geral", "Perguntas e Respostas", "Notas", "Fórum"];

export default function Aula() {
  const navigate   = useNavigate();
  const [aba, setAba]     = useState(0);
  const [busca, setBusca] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Topnav titulo="CURSO AVANÇADO DE CONFEITARIA" progresso={35} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Área principal ── */}
        <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">

          {/* Player */}
          <div className="bg-black rounded-card overflow-hidden relative" style={{ aspectRatio: "16/9", maxHeight: 580 }}>
            <img
              src="https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?w=1000&q=80"
              alt="aula"
              className="w-full h-full object-cover opacity-85"
            />

            {/* Badge AO VIVO */}
            <span className="absolute bottom-14 right-4 bg-red-600 text-white text-[0.7rem] font-black tracking-widest px-2 py-0.5 rounded">
              AO VIVO
            </span>

            {/* Controles */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3 flex items-center gap-3">
              <button className="text-white text-lg">⏮</button>
              <button className="text-white text-xl">▶</button>
              <button className="text-white text-lg">⏭</button>
              <button className="text-white text-base">🔊</button>
              <span className="text-white/60 text-xs">16:9</span>
              <div className="flex-1 h-1 bg-white/25 rounded-full relative">
                <div className="w-[35%] h-full bg-brand rounded-full" />
                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow" />
              </div>
              <svg className="w-6 h-5 fill-white/60 hover:fill-white transition cursor-pointer" viewBox="0 0 24 24">
                <path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-8 9H8v-1h3v1zm5 0h-3v-1h3v1zm2-3H8V9h10v1z"/>
              </svg>
              <button className="text-white/60 text-base hover:text-white transition">⚙️</button>
              <button className="text-white/60 text-base hover:text-white transition">⛶</button>
            </div>
          </div>

          {/* Abas */}
          <div>
            <div className="flex gap-7 border-b border-border">
              {ABAS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setAba(i)}
                  className={`pb-3 text-sm font-body transition-all border-b-2 -mb-px
                    ${aba === i
                      ? "text-brand font-bold border-brand"
                      : "text-ink-muted font-normal border-transparent hover:text-ink"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="pt-5">
              {aba === 0 && (
                <div>
                  <h4 className="text-brand font-black text-xs tracking-widest uppercase mb-3">
                    Descrição da Lição
                  </h4>
                  <p className="text-sm text-ink leading-relaxed">
                    Aprenda a fazer coberturas perfeitas e técnicas para saber como cotinias e finalizar
                    suas criações com elegância. Esta lição abrange os fundamentos de higiene na cozinha
                    profissional, normas de segurança alimentar e boas práticas que todo confeiteiro precisa dominar.
                  </p>
                </div>
              )}
              {aba === 1 && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-ink-muted">Nenhuma pergunta ainda. Seja o primeiro!</p>
                  {/* Caixa de comentário */}
                  <div className="flex flex-col gap-2">
                    <textarea
                      placeholder="Seja o primeiro a comentar..."
                      rows={3}
                      className="w-full bg-surface-input border border-border rounded-btn px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition resize-none"
                    />
                    <div className="flex justify-end">
                      <button className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-6 py-2.5 rounded-btn transition-all duration-200 active:scale-95">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {aba === 2 && <p className="text-sm text-ink-muted">Suas notas aparecerão aqui.</p>}
              {aba === 3 && <p className="text-sm text-ink-muted">Fórum da turma em breve.</p>}
            </div>
          </div>
        </div>

        {/* ── Sidebar de conteúdo ── */}
        <aside className="w-72 shrink-0 bg-surface-card border-l border-border flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-body text-base font-black mb-3">Conteúdo do Curso</h3>
            <div className="relative">
              <input
                placeholder="Pesquisar"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-surface-input border border-border rounded-btn px-4 py-2 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition pr-9"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
            </div>
          </div>

          {/* Seções */}
          <div className="overflow-y-auto flex-1">
            {SECOES.map((secao, i) => {
              const licoesFiltradas = busca
                ? secao.licoes.filter((l) =>
                    l.nome.toLowerCase().includes(busca.toLowerCase())
                  )
                : secao.licoes;

              if (busca && licoesFiltradas.length === 0) return null;

              return (
                <SectionAccordion
                  key={busca ? `busca-${i}` : `normal-${i}`}
                  titulo={secao.titulo}
                  licoes={licoesFiltradas}
                  defaultOpen={busca ? true : secao.defaultOpen}
                />
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
