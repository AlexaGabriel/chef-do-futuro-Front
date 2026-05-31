import { useNavigate } from "react-router-dom";
import AppLayout       from "../layout/AppLayout";
import Badge           from "../components/ui/Badge";
import Button          from "../components/ui/Button";
import QuickCourseCard from "../components/curso/QuickCourseCard";

const CURSOS_RAPIDOS = [
  { nome: "Massa Caseira",  label: "Curso 1", progresso: 60, img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300&q=80" },
  { nome: "Sushi",          label: "Curso 2", progresso: 35, img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80" },
  { nome: "Tacos",          label: "Curso 3", progresso: 10, img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=300&q=80" },
  { nome: "Macarons",       label: "Curso 4", progresso: 80, img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&q=80" },
  { nome: "Frango Assado",  label: "Curso 5", progresso: 20, img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=300&q=80" },
  { nome: "Pão Artesanal",  label: "Curso 6", progresso: 50, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
];

export default function Inicial() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* ── Destaques ── */}
      <section className="animate-fade-up">
        <h2 className="text-2xl font-black mb-5">Destaques</h2>

        <div className="bg-surface-card rounded-card shadow-sm grid grid-cols-3 overflow-hidden min-h-52">
          {/* Coluna esquerda */}
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="font-display text-2xl font-bold leading-snug">
              Continue onde<br />você parou
            </h3>
            <button
              onClick={() => navigate("/aula/1")}
              className="flex items-center gap-2 text-brand font-bold text-sm hover:opacity-80 transition"
            >
              <span className="w-7 h-7 rounded-full border-2 border-brand flex items-center justify-center text-xs">▷</span>
              Assistir resumo
            </button>
          </div>

          {/* Thumbnail central */}
          <div
            className="relative cursor-pointer group"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}
            onClick={() => navigate("/aula/1")}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-xl shadow-lg">
                ▶
              </div>
            </div>
          </div>

          {/* Info direita */}
          <div className="flex flex-col justify-center gap-3 p-8">
            <Badge variant="default">Em Progresso</Badge>
            <h4 className="font-display text-lg font-bold leading-snug">
              MÓDULO 3: ARROZ E FEIJÃO 2
            </h4>
            <p className="text-sm text-ink-muted leading-relaxed">
              <span className="font-bold text-ink">Descrição:</span> Aprenda técnicas avançadas de
              preparação para combinar sabores e texturas tradicionais.
            </p>
            <Button fullWidth onClick={() => navigate("/aula/1")}>
              VOLTAR PARA A AULA ▶
            </Button>
          </div>
        </div>
      </section>

      {/* ── Acesso Rápido ── */}
      <section className="mt-10 animate-fade-up-2">
        <h2 className="text-2xl font-black mb-5">Acesso Rápido</h2>
        <div className="grid grid-cols-6 gap-4">
          {CURSOS_RAPIDOS.map((curso, i) => (
            <QuickCourseCard
              key={i}
              {...curso}
              onClick={() => navigate("/aula/1")}
            />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
