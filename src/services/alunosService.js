import api from './api';

const alunosService = {
  // Listar todos os alunos
  listar: async (params = {}) => {
    const { pagina, limite, busca, status } = params;
    const queryParams = new URLSearchParams();
    
    if (pagina) queryParams.append('pagina', pagina);
    if (limite) queryParams.append('limite', limite);
    if (busca) queryParams.append('busca', busca);
    if (status) queryParams.append('status', status);
    
    return api.get(`/api/v1/alunos/?${queryParams.toString()}`);
  },

  // Buscar aluno por ID
  buscarPorId: async (id) => {
    return api.get(`/api/v1/alunos/${id}`);
  },

  // Criar novo aluno
  criar: async (dados) => {
    return api.post('/api/v1/alunos/', dados);
  },

  // Atualizar aluno
  atualizar: async (id, dados) => {
    return api.patch(`/api/v1/alunos/${id}`, dados);
  },

  // Deletar aluno
  deletar: async (id) => {
    return api.delete(`/api/v1/alunos/${id}`);
  },
};

export default alunosService;
