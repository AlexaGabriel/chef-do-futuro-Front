export default function ChatMessage({ message, isOwn }) {
  const hora = message.criadoEm
    ? new Date(message.criadoEm).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isOwn
            ? 'bg-brand text-white rounded-br-md'
            : 'bg-surface-input text-ink rounded-bl-md'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-ink-muted mb-0.5 truncate">
            {message.remetente?.nome || message.remetenteId}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words">{message.conteudo}</p>
        {hora && (
          <p
            className={`text-[10px] mt-1 ${
              isOwn ? 'text-white/70' : 'text-ink-faint'
            }`}
          >
            {hora}
          </p>
        )}
      </div>
    </div>
  );
}
