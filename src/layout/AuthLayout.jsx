/**
 * AuthLayout
 * Fundo texturizado + card centralizado para login e cadastros.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      {children}
    </div>
  );
}
