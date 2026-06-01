import api from './api';

const coordenadoresService = {
  // Listar todos os coordenadores
  listar: async (params = {}) => {
    const { pagina, limite, busca, status } = params;
    const queryParams = new URLSearchParams();
    
    if (pagina) queryParams.append('pagina', pagina);
    if (limite) queryParams.append('limite', limite);
    if (busca) queryParams.append('busca', busca);
    if (status) queryParams.append('status', status);
    
    return api.get(`/api/v1/coordenadores/?${queryParams.toString()}`);
  },

  // Buscar coordenador por ID
  buscarPorId: async (id) => {
    return api.get(`/api/v1/coordenadores/${id}`);
  },

  // Criar novo coordenador
  criar: async (dados) => {
    return api.post('/api/v1/coordenadores/', dados);
  },

  // Atualizar coordenador
  atualizar: async (id, dados) => {
    return api.patch(`/api/v1/coordenadores/${id}`, dados);
  },

  // Deletar coordenador
  deletar: async (id) => {
    return api.delete(`/api/v1/coordenadores/${id}`);
  },
};

export default coordenadoresService;
