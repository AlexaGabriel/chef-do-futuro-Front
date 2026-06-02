import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout  from "../layout/AuthLayout";
import Input       from "../components/ui/Input";
import Select      from "../components/ui/Select";
import FileUpload  from "../components/ui/FileUpload";
import Button      from "../components/ui/Button";
import professoresService from "../services/professoresService";

const ESPECIALIDADES = [
  "Confeitaria", "Culinária Vegana", "Sushi & Culinária Japonesa",
  "Panificação", "Massas", "Gastronomia Molecular", "Churrasco",
];

export default function CadastroProfessor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", 
    nome: "", 
    especialidades: [], 
    cpf: "", 
    telefone: "", 
    bio: "",
    cargaHoraria: 40,
    disciplinas: [],
    senha: "",
    confirmarSenha: ""
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  function set(field) {
    return (e) => {
      const value = e.target.value;
      if (field === "especialidades") {
        setForm((prev) => ({ ...prev, [field]: [value] }));
      } else {
        setForm((prev) => ({ ...prev, [field]: value }));
      }
    };
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
      await professoresService.criar(dadosEnvio);
      localStorage.setItem("professorNome", form.nome);
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
      {/* Barra superior */}
      <div className="fixed top-0 right-0 left-0 h-14 flex items-center justify-end gap-4 px-8 bg-surface z-10">
        <button className="text-ink-faint hover:text-ink text-xl transition">❓</button>
        <Button variant="link" onClick={() => navigate("/login")} className="font-bold">
          Voltar ao Login
        </Button>
      </div>

      <div className="bg-surface-card rounded-card shadow-card w-full max-w-2xl p-12 mt-14 animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-ink text-center mb-1">Cadastrar-se</h1>
        <p className="text-sm text-ink-muted text-center mb-8">
          Junte-se à nossa equipe de instrutores
        </p>

        {enviado ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <span className="text-5xl">✅</span>
            <p className="font-bold text-lg">Inscrição enviada!</p>
            <p className="text-sm text-ink-muted">Entraremos em contato em breve. Redirecionando…</p>
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
              <Input label="Insira seu E-mail" id="email" type="email" placeholder="exemplo@email.com" value={form.email} onChange={set("email")} required prefix="✉️" />
              <Input label="Insira seu nome"   id="nome"  type="text"  placeholder="Nome Completo"     value={form.nome}  onChange={set("nome")}  required prefix="👤" />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Select label="Especialidade"    id="esp"  placeholder="" options={ESPECIALIDADES} value={form.especialidades[0] || ""} onChange={set("especialidades")} required />
              <Input  label="CPF"               id="cpf"  type="text"   placeholder="000.000.000-00"   value={form.cpf}      onChange={set("cpf")} required />
              <Input  label="Nº de telefone"    id="tel"  type="text"   placeholder="+55 11 99999 9999" value={form.telefone} onChange={set("telefone")} required />
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Bio / Descrição" id="bio" type="text" placeholder="Conte sobre você" value={form.bio} onChange={set("bio")} />
              <Input label="Carga Horária (h/semana)" id="cargaHoraria" type="number" placeholder="40" value={form.cargaHoraria} onChange={set("cargaHoraria")} required />
            </div>

            {/* Linha 4 - Senha */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Senha" id="senha" type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={set("senha")} required />
              <Input label="Confirmar Senha" id="confirmarSenha" type="password" placeholder="Digite a senha novamente" value={form.confirmarSenha} onChange={set("confirmarSenha")} required />
            </div>

            <Button type="submit" fullWidth className="mt-2" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Inscrição"}
            </Button>

            <p className="text-center text-sm text-ink-muted">
              Já é instrutor?{" "}
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
