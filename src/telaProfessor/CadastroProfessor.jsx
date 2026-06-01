import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout  from "../layout/AuthLayout";
import Input       from "../components/ui/Input";
import Select      from "../components/ui/Select";
import FileUpload  from "../components/ui/FileUpload";
import Button      from "../components/ui/Button";

const ESPECIALIDADES = [
  "Confeitaria", "Culinária Vegana", "Sushi & Culinária Japonesa",
  "Panificação", "Massas", "Gastronomia Molecular", "Churrasco",
];
const TURNOS = ["Matutino", "Vespertino", "Noturno"];

export default function CadastroProfessor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", nome: "", especialidade: "", cpf: "", telefone: "", turno: "", arquivo: null,
  });
  const [enviado, setEnviado] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("professorNome", form.nome);
    setEnviado(true);
    setTimeout(() => navigate("/login"), 2200);
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
            {/* Linha 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Insira seu E-mail" id="email" type="email" placeholder="exemplo@email.com" value={form.email} onChange={set("email")} required prefix="✉️" />
              <Input label="Insira seu nome"   id="nome"  type="text"  placeholder="Nome Completo"     value={form.nome}  onChange={set("nome")}  required prefix="👤" />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Select label="Especialidades"    id="esp"  placeholder="" options={ESPECIALIDADES} value={form.especialidade} onChange={set("especialidade")} required />
              <Input  label="CPF"               id="cpf"  type="text"   placeholder="000.000.000-00"   value={form.cpf}      onChange={set("cpf")}      />
              <Input  label="Nº de telefone"    id="tel"  type="text"   placeholder="+55 11 99999 9999" value={form.telefone} onChange={set("telefone")} />
            </div>

            {/* Linha 3 */}
            <div className="grid grid-cols-2 gap-4">
              <FileUpload
                label="Portfólio"
                accept=".pdf,.doc,.docx"
                onChange={(file) => setForm((prev) => ({ ...prev, arquivo: file }))}
              />
              <Select label="Turno" id="turno" placeholder="" options={TURNOS} value={form.turno} onChange={set("turno")} required />
            </div>

            <Button type="submit" fullWidth className="mt-2">
              Enviar Inscrição
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
