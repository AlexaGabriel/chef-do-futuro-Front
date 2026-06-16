import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import authService from "../services/authService";

const USER_TYPES = [
  { value: "aluno",       label: "Aluno",       icon: "graduation-cap" },
  { value: "professor",   label: "Professor",   icon: "briefcase" },
  { value: "coordenador", label: "Coordenador", icon: "clipboard" },
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [userType, setUserType] = useState("aluno");
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
      if (userType === "aluno") {
        await authService.loginAluno(form.email, form.senha);
        navigate("/inicio");
      } else if (userType === "professor") {
        await authService.loginProfessor(form.email, form.senha);
        navigate("/professor/dashboard");
      } else if (userType === "coordenador") {
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
      {/*
        Mobile: w-full, padding reduzido, arredondado menor.
        sm+: max-w-md e padding maior.
      */}
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-sm sm:max-w-md p-6 sm:p-10 md:p-12 animate-fade-up">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2 text-center">
          Login
        </h1>
        <p className="text-sm text-ink-muted text-center mb-6">Acesse sua conta</p>

        {/* Seletor de tipo de usuário */}
        <div className="flex gap-2 mb-6" role="group" aria-label="Tipo de usuário">
          {USER_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setUserType(type.value)}
              aria-pressed={userType === type.value}
              className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-btn text-xs sm:text-sm font-bold
                          transition-all duration-200 min-h-[44px] ${
                userType === type.value
                  ? "bg-brand text-white shadow-md"
                  : "bg-surface-input text-ink-muted hover:bg-surface-input/80"
              }`}
            >
              <Icon name={type.icon} size={22} className="block mx-auto mb-0.5" />
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
            autoComplete="email"
          />

          <Input
            label="Digite sua senha"
            id="senha"
            type="password"
            placeholder="••••••••••"
            value={form.senha}
            onChange={set("senha")}
            required
            autoComplete="current-password"
          />

          <div className="text-right -mt-1">
            <Button variant="link">esqueceu a senha?</Button>
          </div>

          {erro && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm"
            >
              {erro}
            </div>
          )}

          <Button type="submit" fullWidth className="mt-2 min-h-[44px]" disabled={loading}>
            {loading ? "ENTRANDO..." : "LOGIN"}
          </Button>
        </form>

        {/* Links de cadastro — empilha em mobile, inline em sm */}
        <div className="mt-6 text-center text-sm text-ink-muted flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0 flex-wrap">
          <span>Não tem conta?</span>
          <Button
            variant="link"
            onClick={() => navigate("/cadastro-aluno")}
            className="font-bold sm:ml-1"
          >
            Cadastre-se como aluno
          </Button>
          <span className="hidden sm:inline mx-1">·</span>
          <Button
            variant="link"
            onClick={() => navigate("/cadastro-professor")}
            className="font-bold"
          >
            Sou professor
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
