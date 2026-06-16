import { useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import { useChat } from '../../context/ChatContext';
import ChatWindow from './ChatWindow';

const PUBLIC_ROUTES = ['/login', '/cadastro-aluno', '/cadastro-professor', '/'];

export default function ChatFloatingButton() {
  const location = useLocation();
  const { isOpen, toggleChat, totalUnread, isConnected } = useChat();

  if (!authService.isAuthenticated()) return null;
  if (PUBLIC_ROUTES.includes(location.pathname)) return null;

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-ink-muted scale-90 hover:bg-ink-muted'
            : 'bg-brand hover:bg-brand-dark'
        }`}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
        title={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {!isConnected && (
          <span
            className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            title="Desconectado"
          />
        )}

        {totalUnread > 0 && !isOpen && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>

      <ChatWindow />
    </>
  );
}
