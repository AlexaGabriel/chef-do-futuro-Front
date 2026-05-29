import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input    from "../components/ui/Input";
import Select   from "../components/ui/Select";
import Button   from "../components/ui/Button";

const CURSOS = [
  "Confeitaria Básica", "Culinária Vegana", "A Arte de Fazer Sushi",
  "Panificação Artesanal", "Massas Italianas", "Gastronomia Molecular",
];
const TURNOS = ["Matutino", "Vespertino", "Noturno"];

export default function CadastroAluno() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", nome: "", nascimento: "", cpf: "", telefone: "", curso: "", turno: "",
  });
  const [enviado, setEnviado] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => navigate("/login"), 2200);
  }

  return (
    <AuthLayout>
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-2xl p-12 animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-ink mb-1">
          <span className="font-black">Registrar</span>{" "}
          <span className="font-light text-ink-muted text-2xl">(Estudante)</span>
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
            {/* Linha 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Digite Seu E-mail"  id="email"  type="email"  placeholder="exemplo@email.com" value={form.email}  onChange={set("email")}  required />
              <Input label="Digite Seu Nome"    id="nome"   type="text"   placeholder="Jane Doe"          value={form.nome}   onChange={set("nome")}   required />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Input label="Data de Nascimento" id="nasc"   type="text"  placeholder="DD/MM/AAAA"        value={form.nascimento} onChange={set("nascimento")} />
              <Input label="CPF"                id="cpf"    type="text"  placeholder="000.000.000-00"     value={form.cpf}        onChange={set("cpf")}        />
              <Input label="Nº de Telefone"     id="tel"    type="text"  placeholder="(00) 91234-5678"   value={form.telefone}   onChange={set("telefone")}   />
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Select label="Curso Escolhido" id="curso"  placeholder="Selecionar Curso"  options={CURSOS} value={form.curso}  onChange={set("curso")}  required />
              <Select label="Turno"           id="turno"  placeholder="Selecionar Turno"  options={TURNOS} value={form.turno}  onChange={set("turno")}  required />
            </div>

            <Button type="submit" fullWidth className="mt-2">
              Enviar Registro
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
