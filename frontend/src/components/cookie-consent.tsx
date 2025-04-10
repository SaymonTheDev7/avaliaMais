import { useEffect, useState } from 'react';
import Image from 'next/image';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (cookieConsent === 'accepted' || cookieConsent === 'declined') {
      setIsVisible(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    console.log("Aceitar Cookies clicado"); // Verificação
    localStorage.setItem('cookie_consent', 'accepted');
    triggerExitAnimation();
  };

  const handleDeclineCookies = () => {
    console.log("Recusar Cookies clicado"); // Verificação
    localStorage.setItem('cookie_consent', 'declined');
    triggerExitAnimation();
  };

  const triggerExitAnimation = () => {
    console.log("Iniciando animação de saída"); // Verificação
    setIsAnimating(true); // Inicia a animação de saída
    setTimeout(() => {
      setIsVisible(false); // Esconde o componente após a animação
    }, 500); // Tempo da animação (500ms para coincidir com o tempo de transição)
  };

  if (!isVisible) return null; // Se não for visível, retorna null e não renderiza

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-[var(--color-sidebar)] text-[var(--color-primary-foreground)] p-4 flex justify-between items-center shadow-lg transition-all duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      } sm:bottom-4 sm:left-4 sm:w-auto sm:px-6 sm:py-4 rounded-lg sm:flex-row flex-col sm:translate-y-0 animate-slide-in`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4 select-none">
        <Image
          src="/Logo.png"
          alt="Logo Avalia+"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="text-sm text-white">
          Este site usa cookies para melhorar a sua experiência{' '}
        </p>
      </div>

      <div className="flex space-x-2 select-none">
        <button
          onClick={handleAcceptCookies}
          className="bg-[var(--color-accent)] text-[var(--color-accent-foreground)] ml-2 py-2 px-4 rounded-lg hover:bg-[var(--ring)] hover:text-[var(--primary-foreground)] focus:outline-none transition-all duration-300"
        >
          Aceitar
        </button>
        <button
          onClick={handleDeclineCookies}
          className="bg-[var(--sidebar-border)] text-[var(--color-secondary-foreground)] py-2 px-4 rounded-lg hover:bg-[var(--popover)] hover:text-[var(--color-input)] focus:outline-none transition-all duration-300"
        >
          Recusar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
