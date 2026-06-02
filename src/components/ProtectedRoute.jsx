import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se roles específicas forem especificadas, verifica se o usuário tem permissão
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redireciona para a página apropriada baseado na role
    if (userRole === 'aluno') {
      return <Navigate to="/inicio" replace />;
    } else if (userRole === 'professor') {
      return <Navigate to="/professor/dashboard" replace />;
    } else if (userRole === 'coordenador') {
      return <Navigate to="/coordenador/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}
