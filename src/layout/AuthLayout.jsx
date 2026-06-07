/**
 * AuthLayout
 * Fundo texturizado + card centralizado para login e cadastros.
 * Mobile-first: padding reduzido, card ocupa largura total em telas pequenas.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 sm:p-6">
      {children}
    </div>
  );
}
