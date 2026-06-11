import Sidebar from "../components/Sidebar";
import Topnav from "./Topnav";

/**
 * AppLayout
 * Layout padrão das páginas autenticadas.
 * Mobile: sidebar como drawer overlay + topnav com hamburger.
 * Desktop (lg+): sidebar fixada à esquerda.
 */
export default function AppLayout({ children, topnavProps = {} }) {
  return (
    <div className="flex min-h-screen bg-surface overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 w-full">
        <Topnav {...topnavProps} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
