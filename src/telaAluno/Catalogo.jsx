import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout  from "../layout/AppLayout";
import CourseCard from "../components/curso/CourseCard";
import cursosService from "../services/cursosService";

export default function Catalogo() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarCursos() {
      try {
        const response = await cursosService.listar();
        setCursos(response.dados || []);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarCursos();
  }, []);

  return (
    <AppLayout>
      <h2 className="text-2xl font-black mb-7 animate-fade-up">
        Catálogo de Módulos / Cursos Disponíveis
      </h2>

      {loading && (
        <div className="text-center py-10 text-ink-muted">
          Carregando cursos...
        </div>
      )}

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {erro}
        </div>
      )}

      {!loading && !erro && cursos.length === 0 && (
        <div className="text-center py-10 text-ink-muted">
          Nenhum curso disponível no momento.
        </div>
      )}

      {!loading && !erro && cursos.length > 0 && (
        <div className="grid grid-cols-3 gap-6 animate-fade-up-1">
          {cursos.map((curso) => (
            <CourseCard
              key={curso._id || curso.id}
              nome={curso.titulo}
              horario={`Nível: ${curso.nivel} • ${curso.duracao || 0}h`}
              vagas={`Disponível`}
              img={curso.imagemUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"}
              onMatricular={() => navigate(`/aula/${curso._id || curso.id}`)}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
