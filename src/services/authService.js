import api from './api';

const authService = {
  // Login de Aluno
  loginAluno: async (email, senha) => {
    const response = await api.post('/api/v1/auth/aluno/login', { email, senha });
    
    // Tenta diferentes estruturas de resposta
    const token = response.dados?.token || response.token;
    const usuario = response.dados?.usuario || response.usuario || response.aluno;
    
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('userRole', 'aluno');
    }
    return response;
  },

  // Login de Professor
  loginProfessor: async (email, senha) => {
    const response = await api.post('/api/v1/auth/professor/login', { email, senha });
    
    const token = response.dados?.token || response.token;
    const usuario = response.dados?.usuario || response.usuario || response.professor;
    
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('userRole', 'professor');
    }
    return response;
  },

  // Login de Coordenador
  loginCoordenador: async (email, senha) => {
    const response = await api.post('/api/v1/auth/coordenador/login', { email, senha });
    
    const token = response.dados?.token || response.token;
    const usuario = response.dados?.usuario || response.usuario || response.coordenador;
    
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('userRole', 'coordenador');
    }
    return response;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userRole');
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obter usuário (alias para compatibilidade)
  getUser: () => {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obter role do usuário
  getUserRole: () => {
    return localStorage.getItem('userRole');
  },

  // Obter token
  getToken: () => {
    return localStorage.getItem('authToken');
  }
};

export default authService;
