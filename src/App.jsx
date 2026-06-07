import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login             from "./pages/Login";
import CadastroAluno from "./telaAluno/CadastroAluno";
import CadastroProfessor from "./telaProfessor/CadastroProfessor";
import Inicial from "./telaAluno/Inicial";
import Catalogo          from "./telaAluno/Catalogo";
import MeusCursos    from "./telaAluno/MeusCursos";
import Configuracoes from "./telaAluno/Configuracoes";
import Aula              from "./telaAluno/Aula";
import ProfessorDashboard from "./telaProfessor/DashboardProfessor";
import GerenciarModulos from "./telaProfessor/GerenciarModulos";
import ListaEspera from "./telaProfessor/ListaEspera";
import Frequencia from "./telaProfessor/Frequencia";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login"               element={<Login />} />
        <Route path="/cadastro-aluno"      element={<CadastroAluno />} />
        <Route path="/cadastro-professor"  element={<CadastroProfessor />} />

        {/* Área do aluno - Protegida */}
        <Route path="/inicio"              element={
          <ProtectedRoute allowedRoles={['aluno']}>
            <Inicial />
          </ProtectedRoute>
        } />
        <Route path="/catalogo"            element={
          <ProtectedRoute allowedRoles={['aluno']}>
            <Catalogo />
          </ProtectedRoute>
        } />
        <Route path="/aula/:id"            element={
          <ProtectedRoute allowedRoles={['aluno']}>
            <Aula />
          </ProtectedRoute>
        } />

        {/* Área do professor - Protegida */}
        <Route path="/professor/dashboard" element={
          <ProtectedRoute allowedRoles={['professor']}>
            <ProfessorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/professor/cursos" element={
          <ProtectedRoute allowedRoles={['professor']}>
            <GerenciarModulos />
          </ProtectedRoute>
        } />
        <Route path="/professor/lista-espera" element={
          <ProtectedRoute allowedRoles={['professor']}>
            <ListaEspera />
          </ProtectedRoute>
        } />
        <Route path="/professor/frequencia" element={
          <ProtectedRoute allowedRoles={['professor']}>
            <Frequencia />
          </ProtectedRoute>
        } />

        {/* Área do professor */}
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/professor/cursos" element={<GerenciarModulos />} />
        <Route path="/professor/lista-espera" element={<ListaEspera />} />
        <Route path="/professor/frequencia" element={<Frequencia />} />

        {/* Config e Notificações */}
        <Route path="/configuracoes" element={<Configuracoes />} />

        <Route path="*"                    element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
