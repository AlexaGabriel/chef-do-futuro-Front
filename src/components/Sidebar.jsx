import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/inicio",        label: "Painel",        icon: "🏠" },
  { to: "/meus-cursos",   label: "Meus Cursos",   icon: "📋" },
  { to: "/catalogo",      label: "Catálogo",       icon: "📚" },
  { to: "/configuracoes", label: "Configurações",  icon: "⚙️" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-52 shrink-0 min-h-screen bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 mb-4">
        <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center text-lg shrink-0">
          🍳
        </div>
        <span className="font-display text-white text-sm leading-tight">
          Escola<br />Chef do Futuro
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-btn text-sm font-body transition-all duration-150
               ${isActive
                 ? "bg-brand text-white font-bold"
                 : "text-white/60 hover:text-white hover:bg-white/[.06]"
               }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Sair */}
      <div className="px-3 pb-6">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2.5 px-3 py-2.5 w-full rounded-btn
                     text-sm text-white/40 hover:text-white/70
                     hover:bg-white/[.06] transition-all duration-150"
        >
          <span>🚪</span> Sair
        </button>
      </div>
    </aside>
  );
}
