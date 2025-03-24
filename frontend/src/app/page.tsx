import React from 'react';
import LoginForm from '@/components/login-form';

export default function Home() {
  return (
    <main className="flex h-screen w-full">
      {/* Left side with background image and text */}
      <div className="relative w-2/3 overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-[#003366] p-4 z-10">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold">Avalia</h1>
            <span className="text-[#FF5722] text-2xl font-bold">+</span>
          </div>
        </div>
        
        {/* Background image */}
        <div className="absolute inset-0 bg-black/50 z-0">
          <img 
            src="https://tryeasel.dev/placeholder.svg?width=1200&height=800" 
            alt="Students in a library" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center z-10 p-16">
          <div className="text-white text-4xl md:text-5xl font-bold">
            <p>O estudo é a</p>
            <p className="text-[#FF5722]">BASE</p>
            <p>do sucesso!</p>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-1/3 flex items-center justify-center bg-white p-8">
        <LoginForm />
      </div>
    </main>
  );
}