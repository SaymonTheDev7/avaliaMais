import React from 'react';
import LoginForm from '@/components/login-form';
import AvaliaLogo from '@/components/avalia-logo';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with logo */}
      <header className="bg-[#003366] py-3 px-6">
        <AvaliaLogo />
      </header>
      
      {/* Main content */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Left side with background image and text */}
        <div 
          className="relative flex-1 flex items-center justify-center p-8 text-white"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://tryeasel.dev/placeholder.svg?width=1200&height=800')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              O estudo é a <span className="text-[#FF5722]">BASE</span> do sucesso!
            </h1>
          </div>
        </div>
        
        {/* Right side with login form */}
        <div className="w-full md:w-[400px] bg-white p-8 flex items-center justify-center">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}