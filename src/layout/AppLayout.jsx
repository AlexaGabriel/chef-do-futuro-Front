import Sidebar from "../components/Sidebar";
import Topnav from "../components/layout/Topnav";

/**
 * AppLayout
 * Layout padrão das páginas autenticadas (com sidebar).
 */
export default function AppLayout({ children, topnavProps = {} }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topnav {...topnavProps} />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
