import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout       from "../layout/AppLayout";
import Badge           from "../components/ui/Badge";
import Button          from "../components/ui/Button";
import QuickCourseCard from "../components/curso/QuickCourseCard";
import cursosService from "../services/cursosService";

export default function Inicial() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCursos() {
      try {
        const response = await cursosService.listar({ limite: 6 });
        setCursos(response.dados || []);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarCursos();
  }, []);

  return (
    <AppLayout>
      {/* ── Destaques ── */}
      <section className="animate-fade-up">
        <h2 className="text-2xl font-black mb-5">Destaques</h2>

        <div className="bg-surface-card rounded-card shadow-sm grid grid-cols-3 overflow-hidden min-h-52">
          {/* Coluna esquerda */}
          <div className="flex flex-col justify-center gap-4 p-8">
            <h3 className="font-body text-2xl font-black leading-snug tracking-wide">
              Continue onde<br /> você parou
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
            <h4 className="font-body text-base font-black leading-snug tracking-wide">
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
        
        {loading ? (
          <div className="text-center py-10 text-ink-muted">
            Carregando cursos...
          </div>
        ) : cursos.length === 0 ? (
          <div className="text-center py-10 text-ink-muted">
            Nenhum curso disponível no momento.
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {cursos.map((curso, i) => (
              <QuickCourseCard
                key={curso._id || curso.id}
                nome={curso.titulo}
                label={`Curso ${i + 1}`}
                progresso={Math.floor(Math.random() * 100)}
                img={curso.imagemUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80"}
                onClick={() => navigate(`/aula/${curso._id || curso.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
