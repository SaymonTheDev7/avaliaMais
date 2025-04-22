"use client";

import Image from 'next/image';
import LoginForm from '@/components/login-form'; 
import CookieConsent from '@/components/cookie-consent'; 

export default function LoginPage() {
  return (
    <div className="relative flex h-screen">
      {/* Barra de logo e título */}
      <div className="absolute top-0 left-0 w-screen bg-[var(--background-foreground)] p-4 z-20">
        <div className="flex items-center">
          <Image
            className="ml-15"
            src="/Logo.png"
            alt="Logo Avalia+"
            width={150}
            height={50}
          />
        </div>
      </div>

      {/* Imagem de fundo */}
      <div className="relative w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/50">
          <Image
            src="/Login-image.png"
            alt="Students in a library"
            fill
            quality={100}
            className="object-cover opacity-100"
          />
        </div>

        {/* Texto de sobreposição */}
        <div className="absolute inset-0 flex items-center z-10 p-16">
          <div className="text-[var(--color-primary-foreground)] text-4xl md:text-5xl font-bold select-none">
            <p>O estudo é a</p>
            <p className="text-[var(--color-accent)] base">BASE</p>
            <p>do sucesso!</p>
          </div>
        </div>
      </div>

      {/* Formulário de login */}
      <div className="w-1/3 flex items-center justify-center p-8 z-20 relative">
        <LoginForm />
      </div>

      {/* Consentimento de cookies */}
      <CookieConsent />
    </div>
  );
}
