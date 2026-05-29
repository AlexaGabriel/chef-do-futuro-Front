import { useNavigate } from "react-router-dom";
import AppLayout  from "../layout/AppLayout";
import CourseCard from "../components/curso/CourseCard";

const MODULOS = [
  { nome: "Módulo: Confeitaria Básica",                    horario: "Segundas e Quartas, 19h – 22h",             vagas: "15 / 20", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80" },
  { nome: "Módulo: Culinária Vegana e à Base de Plantas",  horario: "Terças e Quintas, 18h – 21h",               vagas: "12 / 20", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80" },
  { nome: "Módulo: A Arte de Fazer Sushi",                 horario: "Sextas, 17h – 21h, e Sábados, 10h – 14h",  vagas: "8 / 15",  img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80" },
  { nome: "Módulo: Panificação Artesanal",                 horario: "Sábados, 9h – 13h",                         vagas: "10 / 15", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80" },
  { nome: "Módulo: Massas Italianas",                      horario: "Quartas e Sextas, 18h – 21h",               vagas: "18 / 20", img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80" },
  { nome: "Módulo: Gastronomia Molecular",                 horario: "Domingos, 14h – 18h",                       vagas: "5 / 10",  img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
];

export default function Catalogo() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <h2 className="text-2xl font-black mb-7 animate-fade-up">
        Catálogo de Módulos / Cursos Disponíveis
      </h2>

      <div className="grid grid-cols-3 gap-6 animate-fade-up-1">
        {MODULOS.map((mod, i) => (
          <CourseCard
            key={i}
            {...mod}
            onMatricular={() => navigate("/aula/1")}
          />
        ))}
      </div>
    </AppLayout>
  );
}
