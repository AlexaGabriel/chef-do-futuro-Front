import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const NAV_ITEMS = [
  { to: "/inicio",        label: "Painel",        icon: "🏠" },
  { to: "/meus-cursos",   label: "Meus Cursos",   icon: "📋" },
  { to: "/catalogo",      label: "Catálogo",       icon: "📚" },
  { to: "/configuracoes", label: "Configurações",  icon: "⚙️" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    authService.logout();
    navigate("/login");
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      {/* ── Mobile: Hamburger Button ── */}
      <button
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5
                   bg-sidebar rounded-btn shadow-card"
      >
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* ── Mobile: Overlay ── */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-sidebar flex flex-col
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-56 lg:shrink-0 lg:min-h-screen
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 mb-4">
          <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center text-lg shrink-0">
            🍳
          </div>
          <span className="font-body text-white text-sm font-black tracking-wide whitespace-nowrap">
            Escola Chef do Futuro
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 flex-1" aria-label="Menu principal">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-3 rounded-btn text-sm font-body transition-all duration-150 min-h-[44px]
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
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-3 w-full min-h-[44px] rounded-btn
                       text-sm text-white/40 hover:text-white/70
                       hover:bg-white/[.06] transition-all duration-150"
          >
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
