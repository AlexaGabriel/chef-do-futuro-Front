import api from './api';

function extrairUserId(usuario) {
  if (!usuario) return null;
  return usuario.id || usuario._id || usuario.usuarioId || usuario.userId || null;
}

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
      const id = extrairUserId(usuario);
      if (id) localStorage.setItem('userId', id);
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
      const id = extrairUserId(usuario);
      if (id) localStorage.setItem('userId', id);
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
      const id = extrairUserId(usuario);
      if (id) localStorage.setItem('userId', id);
    }
    return response;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
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
  },

  // Obter userId de forma robusta (tenta várias fontes)
  getUserId: () => {
    const stored = localStorage.getItem('userId');
    if (stored) return stored;

    const user = authService.getUser();
    if (user) {
      for (const key of ['id', '_id', 'userId', 'usuarioId', 'alunoId', 'professorId']) {
        if (user[key]) return String(user[key]);
      }
      for (const key of Object.keys(user)) {
        if (/id$/i.test(key) && user[key]) return String(user[key]);
      }
    }

    const professorId = localStorage.getItem('professorId');
    if (professorId && professorId !== 'temp-professor-id') return professorId;

    const alunoId = localStorage.getItem('alunoId');
    if (alunoId) return alunoId;

    if (user) {
      console.warn('[authService] Não foi possível extrair userId do objeto:', user);
    }

    return null;
  }
};

export default authService;
