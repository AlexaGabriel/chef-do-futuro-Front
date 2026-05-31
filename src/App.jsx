import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login             from "./pages/Login";
import CadastroAluno from "./telaAluno/CadastroAluno";
import CadastroProfessor from "./telaProfessor/CadastroProfessor";
import Inicial from "./telaAluno/Inicial";
import Catalogo          from "./telaAluno/Catalogo";
import Aula              from "./telaAluno/Aula";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login"               element={<Login />} />
        <Route path="/cadastro-aluno"      element={<CadastroAluno />} />
        <Route path="/cadastro-professor"  element={<CadastroProfessor />} />

        {/* Área do aluno */}
        <Route path="/inicio"              element={<Inicial />} />
        <Route path="/catalogo"            element={<Catalogo />} />
        <Route path="/aula/:id"            element={<Aula />} />

        {/* Páginas futuras */}
        <Route path="/meus-cursos"         element={<Navigate to="/inicio" replace />} />
        <Route path="/configuracoes"       element={<Navigate to="/inicio" replace />} />

        <Route path="*"                    element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
