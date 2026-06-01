import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ email: "", senha: "" });
  const [erro, setErro]   = useState("");

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
  }

  if (form.email.includes("professor")) {
    navigate("/professor/dashboard");
  } else {
    navigate("/inicio");
  }

  return (
    <AuthLayout>
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-md p-12 animate-fade-up">
        <h1 className="font-display text-4xl font-bold text-ink mb-8 text-center">Login</h1>

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

          {erro && <p className="text-brand text-sm">{erro}</p>}

          <Button type="submit" fullWidth className="mt-2">
            LOGIN
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
