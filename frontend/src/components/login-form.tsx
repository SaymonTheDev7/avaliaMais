import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <div className="w-full max-w-md space-y-8 select-none">
      <div className="text-center">
        <h2 className="bold text-5xl  text-[#003366]">LOGIN</h2>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="login h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="text" 
            placeholder="Insira seu login" 
            className="login pl-10 border-t-0 border-x-0 border-b-2 rounded-none focus-visible:ring-0 focus:outline-none focus-visible:outline-none focus-visible:border-[#033377]" 
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="login h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="password" 
            placeholder="Insira sua senha" 
            className="pl-10 border-t-0 border-x-0 border-b-2 rounded-none focus-visible:ring-0 focus:outline-none focus-visible:outline-none focus-visible:border-[#033377]" 
          />
        </div>
        
        <div className="login text-right">
          <a href="#" className="text-start text-[#003366] hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        
        <Button 
          className="w-full hover:bg-[#002244] bg-[var(--foreground)] text-white text-2xl py-6"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
