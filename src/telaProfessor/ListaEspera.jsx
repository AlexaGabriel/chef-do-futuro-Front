import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alunosService from "../services/alunosService";

const TURMAS = ["Todas", "Confeitaria Avançada", "Introdução à Panificação", "Culinária Mediterrânea"];
const POR_PAGINA = 6;

export default function ListaEspera() {
  const navigate = useNavigate();
  const [busca, setBusca]       = useState("");
  const [turma, setTurma]       = useState("Todas");
  const [pagina, setPagina]     = useState(1);
  const [alunos, setAlunos]     = useState([]);
  const [visualizar, setVisualizar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const response = await alunosService.listar();
        setAlunos(response.dados || []);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  // Filtros
  const filtrados = alunos.filter((a) => {
    const matchBusca = a.nome?.toLowerCase().includes(busca.toLowerCase());
    const matchTurma = turma === "Todas" || a.turmas?.includes(turma);
    return matchBusca && matchTurma;
  });

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const paginados    = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  async function excluir(id) {
    try {
      await alunosService.deletar(id);
      setAlunos((prev) => prev.filter((a) => a._id !== id && a.id !== id));
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  }

  return (
    <div className="min-h-screen bg-surface font-body">

      {/* Topnav escuro */}
      <header className="h-14 bg-sidebar flex items-center justify-end px-8 gap-4 shrink-0">
        <div className="relative">
          <button className="text-white/60 hover:text-white text-xl transition">🔔</button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-white text-[9px] flex items-center justify-center font-bold">1</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-base">
          👤
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-5xl mx-auto px-6 py-10 animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink mb-8">
          Gerenciamento da Lista de Espera
        </h1>

        {/* Filtros */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
            <input
              placeholder="Pesquisar aluno..."
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
              className="w-full bg-surface-card border border-border rounded-btn pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-brand transition"
            />
          </div>
          <div className="relative">
            <select
              value={turma}
              onChange={(e) => { setTurma(e.target.value); setPagina(1); }}
              className="select-custom pr-10 min-w-[200px]"
            >
              {TURMAS.map((t) => (
                <option key={t} value={t}>Turma: {t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-surface-card rounded-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Turma Desejada", "Data/Hora", "Status", "Ações"].map((col) => (
                  <th key={col} className="text-left px-5 py-4 text-xs font-black text-ink uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-ink-muted text-sm">
                    Carregando alunos...
                  </td>
                </tr>
              ) : paginados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-ink-muted text-sm">
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : (
                paginados.map((aluno, i) => (
                  <tr key={aluno._id || aluno.id || i} className="border-b border-border last:border-0 hover:bg-surface-input transition-colors duration-100">
                    <td className="px-5 py-4 font-medium text-ink">{aluno.nome}</td>
                    <td className="px-5 py-4 text-ink-muted">{aluno.turmas?.join(", ") || "Nenhuma turma"}</td>
                    <td className="px-5 py-4 text-ink-muted">{new Date(aluno.dataNascimento).toLocaleDateString() || "N/A"}</td>
                    <td className="px-5 py-4">
                      <span className={`font-bold text-xs px-3 py-1 rounded-full ${
                        aluno.status === 'ativo' ? 'bg-green-100 text-green-700' :
                        aluno.status === 'inativo' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {aluno.status || 'aguardando'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Link */}
                        <button className="w-8 h-8 bg-brand hover:bg-brand-dark text-white rounded-btn flex items-center justify-center text-sm transition-all duration-150 active:scale-95">
                          🔗
                        </button>
                        {/* Visualizar */}
                        <button
                          onClick={() => setVisualizar(aluno)}
                          className="w-8 h-8 bg-brand hover:bg-brand-dark text-white rounded-btn flex items-center justify-center text-sm transition-all duration-150 active:scale-95"
                        >
                          👁
                        </button>
                        {/* Excluir */}
                        <button
                          onClick={() => excluir(aluno._id || aluno.id)}
                          className="w-8 h-8 bg-brand hover:bg-brand-dark text-white rounded-btn flex items-center justify-center text-sm transition-all duration-150 active:scale-95"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="w-8 h-8 rounded-btn border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-card disabled:opacity-30 transition"
          >
            ‹
          </button>
          <span className="text-sm text-ink-muted">
            {pagina} of {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="w-8 h-8 rounded-btn border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-card disabled:opacity-30 transition"
          >
            ›
          </button>
        </div>
      </main>

      {/* Modal de visualização */}
      {visualizar && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6"
          onClick={() => setVisualizar(null)}
        >
          <div
            className="bg-surface-card rounded-card shadow-card p-8 w-full max-w-sm animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold text-ink mb-5">Detalhes do Aluno</h3>
            <div className="flex flex-col gap-3 text-sm">
              <p><span className="font-bold text-ink">Nome:</span> <span className="text-ink-muted">{visualizar.nome}</span></p>
              <p><span className="font-bold text-ink">Turma:</span> <span className="text-ink-muted">{visualizar.turma}</span></p>
              <p><span className="font-bold text-ink">Data/Hora:</span> <span className="text-ink-muted">{visualizar.data}</span></p>
              <p><span className="font-bold text-ink">Status:</span>{" "}
                <span className="bg-yellow-100 text-yellow-700 font-bold text-xs px-2 py-0.5 rounded-full">{visualizar.status}</span>
              </p>
            </div>
            <button
              onClick={() => setVisualizar(null)}
              className="mt-6 w-full bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3 rounded-btn transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}