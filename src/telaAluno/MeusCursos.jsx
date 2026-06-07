import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ProgressBar from "../components/ui/ProgressBar";
import Badge from "../components/ui/Badge";

const MEUS_CURSOS = [
  {
    nome: "Curso Avançado de Confeitaria",
    modulo: "Módulo 3: Arroz e Feijão 2",
    progresso: 35,
    status: "Em Progresso",
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    aulas: 24,
    aulasConcluidas: 8,
  },
  {
    nome: "A Arte de Fazer Sushi",
    modulo: "Módulo 1: Fundamentos",
    progresso: 60,
    status: "Em Progresso",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    aulas: 18,
    aulasConcluidas: 11,
  },
  {
    nome: "Panificação Artesanal",
    modulo: "Módulo 2: Fermentação",
    progresso: 80,
    status: "Em Progresso",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    aulas: 15,
    aulasConcluidas: 12,
  },
  {
    nome: "Massas Italianas",
    modulo: "Concluído",
    progresso: 100,
    status: "Concluído",
    img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80",
    aulas: 20,
    aulasConcluidas: 20,
  },
];

export default function MeusCursos() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <h2 className="text-2xl font-black mb-7 animate-fade-up">Meus Cursos</h2>

      <div className="grid grid-cols-2 gap-6 animate-fade-up-1">
        {MEUS_CURSOS.map((curso, i) => (
          <div
            key={i}
            className="bg-surface-card rounded-card shadow-sm overflow-hidden flex hover:-translate-y-1 hover:shadow-card transition-all duration-200"
          >
            {/* Imagem */}
            <img
              src={curso.img}
              alt={curso.nome}
              className="w-36 h-full object-cover shrink-0"
            />

            {/* Conteúdo */}
            <div className="flex flex-col gap-2 p-5 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-body font-black text-sm text-ink leading-snug">{curso.nome}</h3>
                <Badge variant={curso.status === "Concluído" ? "success" : "progress"}>
                  {curso.status}
                </Badge>
              </div>

              <p className="text-xs text-ink-muted">{curso.modulo}</p>

              <p className="text-xs text-ink-faint">
                {curso.aulasConcluidas} de {curso.aulas} aulas concluídas
              </p>

              <div className="flex items-center gap-2 mt-1">
                <ProgressBar value={curso.progresso} className="flex-1" />
                <span className="text-xs font-bold text-brand">{curso.progresso}%</span>
              </div>

              <div className="mt-auto pt-2">
                {curso.status === "Concluído" ? (
                  <button
                    onClick={() => navigate("/aula/1")}
                    className="text-xs font-bold text-ink-muted border border-border rounded-btn px-4 py-2 hover:bg-surface-input transition"
                  >
                    Rever Curso
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/aula/1")}
                    className="text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-btn px-4 py-2 transition active:scale-95"
                  >
                    Continuar ▶
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}