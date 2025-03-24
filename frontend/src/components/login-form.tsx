import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";

export default function LoginForm() {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-[#003366] text-4xl font-bold mb-8 text-center">LOGIN</h2>
      
      <div className="space-y-6">
        {/* Username field */}
        <div className="space-y-2">
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
        </div>
        
        {/* Password field */}
        <div className="space-y-2">
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
        </div>
        
        {/* Forgot password link */}
        <div className="text-right">
          <a href="#" className="text-sm text-[#003366] hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        
        {/* Login button */}
        <Button 
          className="w-full bg-[#003366] hover:bg-[#002244] text-white py-6"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}