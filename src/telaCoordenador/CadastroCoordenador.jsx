import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { maskCPF, maskTelefone } from "../utils/masks";
import AuthLayout  from "../layout/AuthLayout";
import Input       from "../components/ui/Input";
import Select      from "../components/ui/Select";
import Button      from "../components/ui/Button";
import coordenadoresService from "../services/coordenadoresService";

const DEPARTAMENTOS = [
  { value: "pedagogico",  label: "Pedagógico"  },
  { value: "financeiro",  label: "Financeiro"  },
  { value: "gestao",      label: "Gestão"      },
];

export default function CadastroCoordenador() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome:             "",
    cpf:              "",
    telefone:         "",
    emailCorporativo: "",
    numeroRegistro:   "",
    departamento:     "",
    permissoes: {
      acessoTotal:       true,
      gestaoAcademica:   false,
      gestaoFinanceira:  false,
    },
    senha:         "",
    confirmarSenha: "",
  });

  const [enviado,  setEnviado]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [erro,     setErro]     = useState(null);
  const [mostrarSenha,          setMostrarSenha]          = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  /* ── helpers ── */
  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function setMasked(field, maskFn) {
    return (e) =>
      setForm((prev) => ({ ...prev, [field]: maskFn(e.target.value) }));
  }

  function togglePermissao(key) {
    setForm((prev) => ({
      ...prev,
      permissoes: { ...prev.permissoes, [key]: !prev.permissoes[key] },
    }));
  }

  /* ── submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    const senhaRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!senhaRegex.test(form.senha)) {
      setErro("A senha deve ter pelo menos 8 caracteres, incluindo um número e um símbolo.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const { confirmarSenha, ...dadosEnvio } = form;
      await coordenadoresService.criar(dadosEnvio);
      setEnviado(true);
      setTimeout(() => navigate("/login"), 2200);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  /* ── render ── */
  return (
    <AuthLayout>
      <div className="bg-surface-card rounded-card shadow-card w-full max-w-2xl p-10 sm:p-12 animate-fade-up">

        {/* Cabeçalho */}
        <h1 className="font-display text-3xl font-bold text-ink mb-1">
          Cadastro de Administrador/Coordenador
        </h1>
        <p className="text-sm text-ink-muted mb-8">
          Definir níveis de acesso e credenciais institucionais
        </p>

        {enviado ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <span className="text-5xl">✅</span>
            <p className="font-bold text-lg">Cadastro realizado com sucesso!</p>
            <p className="text-sm text-ink-muted">Redirecionando para o login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {erro}
              </div>
            )}

            {/* ── 1. Dados Pessoais ── */}
            <section className="flex flex-col gap-4">
              <h2 className="font-body text-base font-bold text-ink border-b border-border pb-2">
                1. Dados Pessoais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Nome Completo"
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={form.nome}
                  onChange={set("nome")}
                  required
                />
                <Input
                  label="CPF"
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={setMasked("cpf", maskCPF)}
                  prefix="👤"
                  required
                />
                <Input
                  label="WhatsApp/Telefone"
                  id="telefone"
                  type="text"
                  placeholder="(00) 90000-0000"
                  value={form.telefone}
                  onChange={setMasked("telefone", maskTelefone)}
                  prefix="📞"
                  required
                />
              </div>
            </section>

            {/* ── 2. Dados Institucionais ── */}
            <section className="flex flex-col gap-4">
              <h2 className="font-body text-base font-bold text-ink border-b border-border pb-2">
                2. Dados Institucionais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Email Corporativo"
                  id="emailCorporativo"
                  type="email"
                  placeholder="usuario@chefdofuturo.com"
                  value={form.emailCorporativo}
                  onChange={set("emailCorporativo")}
                  prefix="🔒"
                  required
                />
                <Input
                  label="Número de Registro"
                  id="numeroRegistro"
                  type="text"
                  placeholder="Digite o código de registro"
                  value={form.numeroRegistro}
                  onChange={set("numeroRegistro")}
                  required
                />
                <Select
                  label="Departamento"
                  id="departamento"
                  placeholder="Selecione o Depart."
                  options={DEPARTAMENTOS}
                  value={form.departamento}
                  onChange={set("departamento")}
                  required
                />
              </div>
            </section>

            {/* ── 3. Níveis de Permissão ── */}
            <section className="flex flex-col gap-4">
              <h2 className="font-body text-base font-bold text-ink border-b border-border pb-2">
                3. Níveis de Permissão
              </h2>

              <div className="border border-border rounded-btn p-4 flex flex-col gap-3">
                <p className="text-xs font-bold text-ink uppercase tracking-wide">
                  Permissões do Sistema
                </p>
                <div className="flex flex-wrap gap-6">

                  {/* Acesso Total */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.permissoes.acessoTotal}
                      onChange={() => togglePermissao("acessoTotal")}
                      className="w-4 h-4 accent-brand rounded"
                    />
                    <span className="text-sm text-ink font-medium">Acesso Total (Master)</span>
                  </label>

                  {/* Gestão Acadêmica */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.permissoes.gestaoAcademica}
                      onChange={() => togglePermissao("gestaoAcademica")}
                      className="w-4 h-4 accent-brand rounded"
                    />
                    <span className="text-sm text-ink-muted">Gestão Acadêmica</span>
                  </label>

                  {/* Gestão Financeira */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.permissoes.gestaoFinanceira}
                      onChange={() => togglePermissao("gestaoFinanceira")}
                      className="w-4 h-4 accent-brand rounded"
                    />
                    <span className="text-sm text-ink-muted">Gestão Financeira</span>
                  </label>

                </div>
              </div>
            </section>

            {/* ── 4. Segurança (Senha) ── */}
            <section className="flex flex-col gap-4">
              <h2 className="font-body text-base font-bold text-ink border-b border-border pb-2">
                4. Segurança (Senha)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Senha */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="senha" className="text-xs font-bold text-ink uppercase tracking-wide">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      id="senha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Digite a senha"
                      value={form.senha}
                      onChange={set("senha")}
                      required
                      className="w-full bg-surface-input border border-border rounded-btn
                                 px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink-faint
                                 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition"
                      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {mostrarSenha ? "🙈" : "🙉"}
                    </button>
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmarSenha" className="text-xs font-bold text-ink uppercase tracking-wide">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <input
                      id="confirmarSenha"
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      placeholder="Confirmar senha"
                      value={form.confirmarSenha}
                      onChange={set("confirmarSenha")}
                      required
                      className="w-full bg-surface-input border border-border rounded-btn
                                 px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink-faint
                                 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarConfirmarSenha((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition"
                      aria-label={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {mostrarConfirmarSenha ? "🙈" : "🙉"}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-ink-muted">
                A senha deve ter pelo menos 8 caracteres, incluir um número e um símbolo.
              </p>
            </section>

            {/* ── Botão ── */}
            <Button type="submit" fullWidth className="mt-2 min-h-[48px]" disabled={loading}>
              {loading ? "Enviando..." : "Finalizar Cadastro de Administrador"}
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
