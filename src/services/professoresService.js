import api from './api';

const professoresService = {
  // Listar todos os professores
  listar: async (params = {}) => {
    const { pagina, limite, busca, status } = params;
    const queryParams = new URLSearchParams();
    
    if (pagina) queryParams.append('pagina', pagina);
    if (limite) queryParams.append('limite', limite);
    if (busca) queryParams.append('busca', busca);
    if (status) queryParams.append('status', status);
    
    return api.get(`/api/v1/professores/?${queryParams.toString()}`);
  },

  // Buscar professor por ID
  buscarPorId: async (id) => {
    return api.get(`/api/v1/professores/${id}`);
  },

  // Criar novo professor
  criar: async (dados) => {
    return api.post('/api/v1/professores/', dados);
  },

  // Atualizar professor
  atualizar: async (id, dados) => {
    return api.patch(`/api/v1/professores/${id}`, dados);
  },

  // Deletar professor
  deletar: async (id) => {
    return api.delete(`/api/v1/professores/${id}`);
  },
};

export default professoresService;
