import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import authService from "../services/authService";

const USER_TYPES = [
  { value: 'aluno', label: 'Aluno', icon: '🎓' },
  { value: 'professor', label: 'Professor', icon: '👨‍🏫' },
  { value: 'coordenador', label: 'Coordenador', icon: '👔' }
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [userType, setUserType] = useState('aluno');
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    
    setErro("");
    setLoading(true);

    try {
      // Chama o serviço de login apropriado baseado no tipo de usuário
      if (userType === 'aluno') {
        await authService.loginAluno(form.email, form.senha);
        navigate("/inicio");
      } else if (userType === 'professor') {
        await authService.loginProfessor(form.email, form.senha);
        navigate("/professor/dashboard");
      } else if (userType === 'coordenador') {
        await authService.loginCoordenador(form.email, form.senha);
        navigate("/coordenador/dashboard");
      }
    } catch (error) {
      setErro(error.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-md p-12 animate-fade-up">
        <h1 className="font-display text-4xl font-bold text-ink mb-2 text-center">Login</h1>
        <p className="text-sm text-ink-muted text-center mb-6">Acesse sua conta</p>

        {/* Seletor de tipo de usuário */}
        <div className="flex gap-2 mb-6">
          {USER_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setUserType(type.value)}
              className={`flex-1 py-3 px-4 rounded-btn text-sm font-bold transition-all duration-200 ${
                userType === type.value
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-surface-input text-ink-muted hover:bg-surface-input/80'
              }`}
            >
              <span className="block text-lg mb-1">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Digite Seu E-mail"
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={form.email}
            onChange={set("email")}
            required
          />

          <Input
            label="Digite sua senha"
            id="senha"
            type="password"
            placeholder="••••••••••"
            value={form.senha}
            onChange={set("senha")}
            required
          />

          <div className="text-right -mt-1">
            <Button variant="link">esqueceu a senha?</Button>
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {erro}
            </div>
          )}

          <Button type="submit" fullWidth className="mt-2" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'LOGIN'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Não tem conta?{" "}
          <Button variant="link" onClick={() => navigate("/cadastro-aluno")} className="font-bold">
            Cadastre-se como aluno
          </Button>
          {" · "}
          <Button variant="link" onClick={() => navigate("/cadastro-professor")} className="font-bold">
            Sou professor
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
}
