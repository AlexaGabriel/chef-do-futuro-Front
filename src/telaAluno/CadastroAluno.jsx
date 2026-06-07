import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { maskCPF, maskTelefone, maskData, validarCPF, validarTelefone } from "../utils/masks";
import AuthLayout from "../layout/AuthLayout";
import Input    from "../components/ui/Input";
import Select   from "../components/ui/Select";
import Button   from "../components/ui/Button";
import alunosService from "../services/alunosService";

const CURSOS = [
  "Confeitaria Básica", "Culinária Vegana", "A Arte de Fazer Sushi",
  "Panificação Artesanal", "Massas Italianas", "Gastronomia Molecular",
];
const NIVEIS = ["iniciante", "intermediario", "avancado"];


export default function CadastroAluno() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    email: "", 
    nome: "", 
    dataNascimento: "", 
    cpf: "", 
    telefone: "", 
    nivelCulinaria: "iniciante",
    observacoes: "",
    senha: "",
    confirmarSenha: ""
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    // Validar senhas
    if (form.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      // Remove confirmarSenha antes de enviar
      const { confirmarSenha, ...dadosEnvio } = form;
      await alunosService.criar(dadosEnvio);
      setEnviado(true);
      setTimeout(() => navigate("/login"), 2200);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-2xl p-12 animate-fade-up">
        <h1 className="font-body text-3xl font-black text-ink mb-1">
          Registrar <span className="font-light text-ink-muted text-2xl">(Estudante)</span>
        </h1>
        <p className="text-sm text-ink-muted mb-8">Preencha os dados para criar sua conta</p>

        {enviado ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <span className="text-5xl">🎉</span>
            <p className="font-bold text-lg">Cadastro enviado com sucesso!</p>
            <p className="text-sm text-ink-muted">Redirecionando para o login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {erro}
              </div>
            )}

            {/* Linha 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Digite Seu E-mail"  id="email"  type="email"  placeholder="exemplo@email.com" value={form.email}  onChange={set("email")}  required />
              <Input label="Digite Seu Nome"    id="nome"   type="text"   placeholder="Jane Doe"          value={form.nome}   onChange={set("nome")}   required />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Input label="Data de Nascimento" id="nasc"   type="date"  placeholder="DD/MM/AAAA"        value={form.dataNascimento} onChange={set("dataNascimento")} required />
              <Input label="CPF"                id="cpf"    type="text"  placeholder="000.000.000-00"     value={form.cpf}        onChange={set("cpf")} required />
              <Input label="Nº de Telefone"     id="tel"    type="text"  placeholder="(00) 91234-5678"   value={form.telefone}   onChange={set("telefone")} required />
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Select label="Nível Culinária" id="nivel"  placeholder="Selecionar Nível"  options={NIVEIS} value={form.nivelCulinaria}  onChange={set("nivelCulinaria")}  required />
              <Input label="Observações" id="obs" type="text" placeholder="Observações adicionais" value={form.observacoes} onChange={set("observacoes")} />
            </div>

            {/* Linha 4 - Senha */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Senha" id="senha" type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={set("senha")} required />
              <Input label="Confirmar Senha" id="confirmarSenha" type="password" placeholder="Digite a senha novamente" value={form.confirmarSenha} onChange={set("confirmarSenha")} required />
            </div>

            <Button type="submit" fullWidth className="mt-2" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Registro"}
            </Button>

            <p className="text-center text-sm text-ink-muted">
              Já tem conta?{" "}
              <Button variant="link" onClick={() => navigate("/login")} className="font-bold">
                Fazer login
              </Button>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
