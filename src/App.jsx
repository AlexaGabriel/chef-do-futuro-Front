import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ── Componentes Globais / Contextos ──
import ProtectedRoute from "./components/ProtectedRoute";
import { ChatProvider } from "./context/ChatContext";
import ChatFloatingButton from "./components/chat/ChatFloatingButton";

// ── Auth ──
import Login from "./pages/Login";
import CadastroAluno from "./telaAluno/CadastroAluno";
import CadastroProfessor from "./telaProfessor/CadastroProfessor";
import CadastroCoordenador from "./telaCoordenador/CadastroCoordenador";

// ── Telas do Aluno ──
import Inicial from "./telaAluno/Inicial";
import Catalogo from "./telaAluno/Catalogo";
import MeusCursos from "./telaAluno/MeusCursos";
import Configuracoes from "./telaAluno/Configuracoes";
import Aula from "./telaAluno/Aula";

// ── Telas do Professor ──
import ProfessorDashboard from "./telaProfessor/DashboardProfessor";
import GerenciarModulos from "./telaProfessor/GerenciarModulos";
import ListaEspera from "./telaProfessor/ListaEspera";
import Frequencia from "./telaProfessor/Frequencia";

// ── Tela do Coordenador ──
import DashboardCoordenador from "./telaCoordenador/DashboardCoordenador";


export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── Auth ── */}
          <Route path="/login"                element={<Login />} />
          <Route path="/cadastro-aluno"       element={<CadastroAluno />} />
          <Route path="/cadastro-professor"   element={<CadastroProfessor />} />
          <Route path="/cadastro-coordenador" element={<CadastroCoordenador />} />

          {/* ── Área do Aluno ── */}
          <Route path="/inicio"        element={<ProtectedRoute allowedRoles={["aluno"]}><Inicial /></ProtectedRoute>} />
          <Route path="/catalogo"      element={<ProtectedRoute allowedRoles={["aluno"]}><Catalogo /></ProtectedRoute>} />
          <Route path="/meus-cursos"   element={<ProtectedRoute allowedRoles={["aluno"]}><MeusCursos /></ProtectedRoute>} />
          <Route path="/aula/:id"      element={<ProtectedRoute allowedRoles={["aluno"]}><Aula /></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute allowedRoles={["aluno"]}><Configuracoes /></ProtectedRoute>} />

          {/* ── Área do Professor ── */}
          <Route path="/professor/dashboard"    element={<ProtectedRoute allowedRoles={["professor"]}><ProfessorDashboard /></ProtectedRoute>} />
          <Route path="/professor/cursos"       element={<ProtectedRoute allowedRoles={["professor"]}><GerenciarModulos /></ProtectedRoute>} />
          <Route path="/professor/lista-espera" element={<ProtectedRoute allowedRoles={["professor"]}><ListaEspera /></ProtectedRoute>} />
          <Route path="/professor/frequencia"   element={<ProtectedRoute allowedRoles={["professor"]}><Frequencia /></ProtectedRoute>} />

          {/* ── Área do Coordenador ── */}
          <Route path="/coordenador/dashboard"  element={<ProtectedRoute allowedRoles={["coordenador"]}><DashboardCoordenador /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ChatFloatingButton />
      </ChatProvider>
    </BrowserRouter>
  );
}