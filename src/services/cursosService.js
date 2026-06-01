import api from './api';

const cursosService = {
  // Listar todos os cursos
  listar: async (params = {}) => {
    const { pagina, limite, busca } = params;
    const queryParams = new URLSearchParams();
    
    if (pagina) queryParams.append('pagina', pagina);
    if (limite) queryParams.append('limite', limite);
    if (busca) queryParams.append('busca', busca);
    
    return api.get(`/api/v1/cursos/?${queryParams.toString()}`);
  },

  // Buscar curso por ID
  buscarPorId: async (id) => {
    return api.get(`/api/v1/cursos/${id}`);
  },

  // Buscar cursos por professor
  buscarPorProfessor: async (professorId) => {
    return api.get(`/api/v1/cursos/professor/${professorId}`);
  },

  // Buscar cursos por categoria
  buscarPorCategoria: async (categoria) => {
    return api.get(`/api/v1/cursos/categoria/${categoria}`);
  },

  // Criar novo curso
  criar: async (dados) => {
    return api.post('/api/v1/cursos/', dados);
  },

  // Atualizar curso
  atualizar: async (id, dados) => {
    return api.patch(`/api/v1/cursos/${id}`, dados);
  },

  // Deletar curso
  deletar: async (id) => {
    return api.delete(`/api/v1/cursos/${id}`);
  },
};

export default cursosService;
