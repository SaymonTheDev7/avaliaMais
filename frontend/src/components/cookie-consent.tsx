'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CookieConsent({
  onAccept,
}: {
  onAccept?: () => void;
}){
  const [hasChecked, setHasChecked] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (cookieConsent === 'accepted') {
      setHasAccepted(true);
    }
    setHasChecked(true); // só libera render depois de checar
  }, []);

  const acceptAndClose = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setHasAccepted(true);
    setShowPopup(false);
    if (onAccept) onAccept();
  };

  const declineAndShowPopup = () => {
    setShowPopup(true);
  };

  const declineAndKeepBanner = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowPopup(false);
  };

  // Só renderiza algo se ainda não aceitou e já checou o localStorage
  if (hasAccepted || !hasChecked) return null;

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-full bg-[var(--color-sidebar)] text-[var(--color-primary-foreground)] p-4 flex justify-between items-center shadow-lg sm:bottom-4 sm:left-4 sm:w-auto sm:px-6 sm:py-4 rounded-lg sm:flex-row flex-col animate-slide-in"
      >
        <div className="flex items-center space-x-4 select-none">
          <Image src="/Logo.png" alt="Logo Avalia+" width={40} height={40} />
          <p className="text-sm text-white">
            Este site usa cookies para melhorar a sua experiência
          </p>
        </div>

        <div className="flex space-x-2 select-none">
          <button
            onClick={acceptAndClose}
            className="bg-[var(--color-accent)] text-[var(--color-accent-foreground)] ml-2 py-2 px-4 rounded-lg hover:bg-[var(--ring)] hover:text-[var(--primary-foreground)]"
          >
            Aceitar
          </button>
          <button
            onClick={declineAndShowPopup}
            className="bg-[var(--sidebar-border)] text-[var(--color-secondary-foreground)] py-2 px-4 rounded-lg hover:bg-[var(--popover)] hover:text-[var(--color-input)]"
          >
            Recusar
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-[var(--color-sidebar)] rounded-lg p-6 shadow-lg max-w-sm text-center">
            <Image
              src="/Logo.png"
              alt="Logo Avalia+"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <p className="mb-5 text-[var(--color-primary-foreground)]">
              Recusar o uso de cookies pode prejudicar o funcionamento do sistema.
              Deseja continuar?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={acceptAndClose}
                className="bg-[var(--color-accent)] text-[var(--color-accent-foreground)] py-2 px-4 rounded-lg hover:bg-[var(--ring)] hover:text-[var(--primary-foreground)]"
              >
                Aceitar
              </button>
              <button
                onClick={declineAndKeepBanner}
                className="bg-[var(--sidebar-border)] text-[var(--color-secondary-foreground)] py-2 px-4 rounded-lg hover:bg-[var(--popover)] hover:text-[var(--color-input)]"
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
