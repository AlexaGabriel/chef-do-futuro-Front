import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

export default function Configuracoes() {
  const navigate = useNavigate();
  const nomeAtual = localStorage.getItem("alunoNome") || "";
  const emailAtual = localStorage.getItem("alunoEmail") || "";

  const [form, setForm] = useState({
    nome: nomeAtual,
    email: emailAtual,
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    notificacoes: "Ativadas",
    idioma: "Português",
  });

  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState("");

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSalvar(e) {
    e.preventDefault();
    if (form.novaSenha && form.novaSenha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setErro("");
    localStorage.setItem("alunoNome", form.nome);
    localStorage.setItem("alunoEmail", form.email);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  }

  return (
    <AppLayout>
      <h2 className="text-2xl font-black mb-7 animate-fade-up">Configurações</h2>

      <div className="grid grid-cols-3 gap-6 animate-fade-up-1">

        {/* Coluna principal */}
        <div className="col-span-2 flex flex-col gap-6">

          {/* Dados pessoais */}
          <div className="bg-surface-card rounded-card shadow-sm p-6">
            <h3 className="font-body font-black text-base text-ink mb-5">Dados Pessoais</h3>
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
                <Select
                  label="Notificações"
                  id="notificacoes"
                  options={["Ativadas", "Desativadas"]}
                  value={form.notificacoes}
                  onChange={set("notificacoes")}
                />
                <Select
                  label="Idioma"
                  id="idioma"
                  options={["Português", "English", "Español"]}
                  value={form.idioma}
                  onChange={set("idioma")}
                />
              </div>

              {erro && <p className="text-brand text-sm">{erro}</p>}

              {salvo && (
                <p className="text-green-600 text-sm font-bold">✅ Configurações salvas!</p>
              )}

              <div className="flex justify-end">
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>

          {/* Alterar senha */}
          <div className="bg-surface-card rounded-card shadow-sm p-6">
            <h3 className="font-body font-black text-base text-ink mb-5">Alterar Senha</h3>
            <div className="flex flex-col gap-4">
              <Input
                label="Senha Atual"
                id="senhaAtual"
                type="password"
                placeholder="••••••••"
                value={form.senhaAtual}
                onChange={set("senhaAtual")}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nova Senha"
                  id="novaSenha"
                  type="password"
                  placeholder="••••••••"
                  value={form.novaSenha}
                  onChange={set("novaSenha")}
                />
                <Input
                  label="Confirmar Nova Senha"
                  id="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmarSenha}
                  onChange={set("confirmarSenha")}
                />
              </div>
              <div className="flex justify-end">
                <Button>Alterar Senha</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna lateral — perfil */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-card rounded-card shadow-sm p-6 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="text-center">
              <p className="font-black text-ink">{form.nome || "Aluno"}</p>
              <p className="text-xs text-ink-muted mt-0.5">{form.email || "—"}</p>
            </div>
            <button className="text-xs font-bold text-brand hover:text-brand-dark underline transition">
              Alterar foto
            </button>
          </div>

          {/* Zona de perigo */}
          <div className="bg-surface-card rounded-card shadow-sm p-6 flex flex-col gap-3">
            <h3 className="font-body font-black text-base text-ink">Conta</h3>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-btn py-2.5 transition active:scale-95"
            >
              Sair da Conta
            </button>
            <button className="w-full text-sm font-bold text-red-500 border border-red-200 hover:bg-red-50 rounded-btn py-2.5 transition">
              Excluir Conta
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}