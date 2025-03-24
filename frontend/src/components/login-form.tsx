import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#003366]">LOGIN</h2>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="text" 
            placeholder="Insira seu login" 
            className="pl-10 border-t-0 border-x-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-[#003366]" 
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="password" 
            placeholder="Insira sua senha" 
            className="pl-10 border-t-0 border-x-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-[#003366]" 
          />
        </div>
        
        <div className="text-right">
          <a href="#" className="text-sm text-[#003366] hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        
        <Button 
          className="w-full bg-[#003366] hover:bg-[#002244] text-white py-6"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}