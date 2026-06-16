import { useState, useEffect } from "react";
import AppLayout from "../layout/AppLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import alunosService from "../services/alunosService";
import authService from "../services/authService";

export default function Configuracoes() {
  const userId = authService.getUserId();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    nivelCulinaria: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!userId) {
      setErro("ID do aluno não encontrado. Faça logout e login novamente.");
      setLoading(false);
      return;
    }

    async function carregarAluno() {
      setLoading(true);
      setErro("");
      try {
        const response = await alunosService.buscarPorId(userId);
        const dados = response.dados || response.aluno || response;

        setForm({
          nome: dados.nome || "",
          email: dados.email || "",
          telefone: dados.telefone || "",
          dataNascimento: dados.dataNascimento
            ? dados.dataNascimento.slice(0, 10)
            : "",
          nivelCulinaria: dados.nivelCulinaria || "",
          observacoes: dados.observacoes || "",
        });
      } catch (error) {
        setErro("Erro ao carregar dados do aluno. Verifique sua conexão.");
        console.error("[Configuracoes]", error);
      } finally {
        setLoading(false);
      }
    }

    carregarAluno();
  }, [userId]);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSalvar(e) {
    e.preventDefault();
    setErro("");
    setSalvo(false);
    setSalvando(true);

    try {
      await alunosService.atualizar(userId, {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        dataNascimento: form.dataNascimento || undefined,
        nivelCulinaria: form.nivelCulinaria || undefined,
        observacoes: form.observacoes || undefined,
      });
      setSalvo(true);
      setTimeout(() => setSalvo(false), 2500);
    } catch (error) {
      setErro(error.message || "Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64 text-ink-faint">
          Carregando...
        </div>
      </AppLayout>
    );
  }

  if (erro && !form.nome) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className="text-red-600 font-medium">{erro}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h2 className="text-2xl font-black mb-7 animate-fade-up">Configurações</h2>

      <div className="grid grid-cols-3 gap-6 animate-fade-up-1">
        {/* Coluna principal */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Dados pessoais */}
          <div className="bg-surface-card rounded-card shadow-sm p-6">
            <h3 className="font-body font-black text-base text-ink mb-5">
              Dados Pessoais
            </h3>
            <form onSubmit={handleSalvar} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  id="nome"
                  type="text"
                  value={form.nome}
                  onChange={set("nome")}
                />
                <Input
                  label="E-mail"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Telefone"
                  id="telefone"
                  type="text"
                  value={form.telefone}
                  onChange={set("telefone")}
                  placeholder="(11) 99999-9999"
                />
                <Input
                  label="Data de Nascimento"
                  id="dataNascimento"
                  type="date"
                  value={form.dataNascimento}
                  onChange={set("dataNascimento")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nível Culinário"
                  id="nivelCulinaria"
                  type="text"
                  value={form.nivelCulinaria}
                  onChange={set("nivelCulinaria")}
                  placeholder="iniciante | intermediario | avancado"
                />
                <div />
              </div>

              <div>
                <label
                  htmlFor="observacoes"
                  className="block text-sm font-bold text-ink mb-1.5"
                >
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  value={form.observacoes}
                  onChange={set("observacoes")}
                  rows={3}
                  className="w-full bg-surface-input border border-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
                  placeholder="Alergias, restrições alimentares..."
                />
              </div>

              {erro && (
                <p className="text-sm text-red-600 font-medium">{erro}</p>
              )}

              {salvo && (
                <p className="text-sm text-green-600 font-bold">
                  Configurações salvas!
                </p>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={salvando}>
                  {salvando ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna lateral — perfil */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-card rounded-card shadow-sm p-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center">
              <Icon name="user" size={32} className="text-ink" />
            </div>
            <div className="text-center">
              <p className="font-black text-ink">{form.nome || "Aluno"}</p>
              <p className="text-xs text-ink-muted mt-0.5">
                {form.email || "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
