import api from './api';

const chatService = {
  buscarHistorico: async (sala, limite = 50) => {
    return api.get(`/api/v1/chat/${encodeURIComponent(sala)}/historico`, {
      params: { limite },
    });
  },

  enviarMensagem: async (data) => {
    return api.post('/api/v1/chat/mensagem', data);
  },
};

export default chatService;
