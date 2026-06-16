import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatWindow() {
  const {
    isOpen,
    closeChat,
    activeRoom,
    rooms,
    currentMessages,
    currentUserId,
    isLoadingHistory,
    isSending,
    entrarSala,
    enviarMensagem,
  } = useChat();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  function handleSelectRoom(e) {
    const room = rooms.find((r) => r.id === e.target.value);
    if (room) {
      entrarSala(room);
    }
  }

  function handleSend(conteudo) {
    enviarMensagem(conteudo).catch(console.error);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-surface-card rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-up border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-brand text-white shrink-0">
        <div className="flex items-center gap-2.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h3 className="font-display text-lg font-bold">Chat</h3>
        </div>
        <button
          onClick={closeChat}
          className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Fechar chat"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Room Selector */}
      <div className="px-4 py-3 border-b border-border bg-surface shrink-0">
        <select
          value={activeRoom?.id || ''}
          onChange={handleSelectRoom}
          className="select-custom w-full bg-surface-input border border-border rounded-lg px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 cursor-pointer"
        >
          <option value="" disabled>
            Selecione um curso
          </option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-surface/50">
        {!activeRoom ? (
          <div className="flex flex-col items-center justify-center h-full text-ink-faint text-sm gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Selecione um curso para conversar</span>
          </div>
        ) : isLoadingHistory ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-ink-faint text-sm">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Carregando mensagens...
            </div>
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-ink-faint text-sm gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Nenhuma mensagem ainda</span>
            <span className="text-xs">Seja o primeiro a enviar!</span>
          </div>
        ) : (
          <>
            {currentMessages.map((msg) => (
              <ChatMessage
                key={msg.id || msg._id}
                message={msg}
                isOwn={String(msg.remetenteId || msg.remetente?.id || '') === String(currentUserId)}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      {activeRoom && (
        <ChatInput onSend={handleSend} disabled={isSending} />
      )}
    </div>
  );
}
