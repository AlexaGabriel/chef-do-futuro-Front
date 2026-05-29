import Button from "../ui/Button";

/**
 * CourseCard
 * Exibe informações de um módulo/curso no catálogo.
 */
export default function CourseCard({ nome, horario, vagas, img, onMatricular }) {
  return (
    <div className="bg-surface-card rounded-card shadow-sm flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card transition-all duration-200">
      {/* Thumbnail */}
      <img
        src={img}
        alt={nome}
        className="w-full h-48 object-cover"
      />

      {/* Conteúdo */}
      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <h3 className="font-bold text-ink leading-snug">{nome}</h3>

        <p className="text-sm text-ink">
          <span className="font-bold">Horário:</span> {horario}
        </p>

        <p className="text-sm text-ink">
          <span className="font-bold">Vagas Disponíveis:</span>{" "}
          <span className="text-brand font-bold">{vagas}</span>
        </p>

        <button className="text-left text-xs text-ink-muted underline hover:text-brand transition w-fit">
          Ver Lista de Materiais Necessários
        </button>

        <div className="mt-auto pt-3">
          <Button variant="primary" fullWidth onClick={onMatricular}>
            Matricular-se
          </Button>
        </div>
      </div>
    </div>
  );
}
