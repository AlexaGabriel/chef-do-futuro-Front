import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import authService from '../services/authService';
import { connectSocket, disconnectSocket } from '../services/socketService';
import chatService from '../services/chatService';
import cursosService from '../services/cursosService';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [unreadByRoom, setUnreadByRoom] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  const socketRef = useRef(null);
  const activeRoomRef = useRef(null);
  const isOpenRef = useRef(false);
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = connectSocket();
    socketRef.current = socket;

    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function handleNovaMensagem(mensagem) {
      setMessagesByRoom((prev) => {
        const roomMessages = prev[mensagem.sala] || [];
        const id = mensagem.id || mensagem._id;
        if (roomMessages.some((m) => (m.id || m._id) === id)) return prev;
        return { ...prev, [mensagem.sala]: [...roomMessages, mensagem] };
      });

      setUnreadByRoom((prev) => {
        const isViewingRoom =
          isOpenRef.current && activeRoomRef.current?.id === mensagem.sala;
        if (isViewingRoom) return prev;
        return {
          ...prev,
          [mensagem.sala]: (prev[mensagem.sala] || 0) + 1,
        };
      });
    }

    function handleErro({ erro }) {
      console.error('Chat socket error:', erro);
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('chat:nova-mensagem', handleNovaMensagem);
    socket.on('chat:erro', handleErro);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('chat:nova-mensagem', handleNovaMensagem);
      socket.off('chat:erro', handleErro);
      disconnectSocket();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function carregarSalas() {
      setIsLoadingRooms(true);
      try {
        const role = authService.getUserRole();
        let cursos = [];

        if (role === 'professor') {
          const professorId = authService.getUserId();
          if (professorId) {
            const res = await cursosService.buscarPorProfessor(professorId);
            cursos = res.dados || [];
          }
        } else {
          const res = await cursosService.listar();
          cursos = res.dados || [];
        }

        setRooms(
          cursos.map((c) => ({
            id: `curso:${c.id || c._id}`,
            nome: c.nome || c.titulo,
          }))
        );
      } catch (error) {
        console.error('Error loading chat rooms:', error);
      } finally {
        setIsLoadingRooms(false);
      }
    }

    carregarSalas();
  }, [isAuthenticated]);

  const entrarSala = useCallback(async (room) => {
    const socket = socketRef.current;
    if (!socket?.connected) return;

    if (activeRoomRef.current?.id) {
      socket.emit('chat:sair-sala', activeRoomRef.current.id);
    }

    setActiveRoom(room);
    socket.emit('chat:entrar-sala', room.id);

    setIsLoadingHistory(true);
    try {
      const res = await chatService.buscarHistorico(room.id);
      const historico = res.dados || [];
      setMessagesByRoom((prev) => ({ ...prev, [room.id]: historico }));
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }

    setUnreadByRoom((prev) => ({ ...prev, [room.id]: 0 }));
  }, []);

  const enviarMensagem = useCallback(async (conteudo) => {
    const room = activeRoomRef.current;
    const userId = authService.getUserId();
    if (!room || !conteudo?.trim() || !userId) return;

    const payload = {
      conteudo: conteudo.trim(),
      remetenteId: userId,
      sala: room.id,
    };

    setIsSending(true);
    try {
      if (socketRef.current?.connected) {
        await new Promise((resolve, reject) => {
          socketRef.current.emit('chat:mensagem', payload, (response) => {
            if (response?.sucesso) resolve(response.dados);
            else reject(new Error(response?.erro || 'Erro ao enviar mensagem'));
          });
        });
      } else {
        await chatService.enviarMensagem(payload);
      }
    } finally {
      setIsSending(false);
    }
  }, []);

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const totalUnread = Object.values(unreadByRoom).reduce(
    (sum, count) => sum + count,
    0
  );

  const currentUserId = authService.getUserId();

  const currentMessages = activeRoom
    ? messagesByRoom[activeRoom.id] || []
    : [];

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isConnected,
        isLoadingHistory,
        isLoadingRooms,
        isSending,
        activeRoom,
        rooms,
        currentMessages,
        currentUserId,
        unreadByRoom,
        totalUnread,
        toggleChat,
        openChat,
        closeChat,
        entrarSala,
        enviarMensagem,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
