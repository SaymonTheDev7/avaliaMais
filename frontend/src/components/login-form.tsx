'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CookieConsent from '@/components/cookie-consent';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const cookieConsent = localStorage.getItem('cookie_consent');
    if (cookieConsent !== 'accepted') {
      setErrorMessage('Você precisa aceitar os cookies para realizar o login.');
      return;
    }

    if (!username || !password) {
      setErrorMessage('Insira um login e uma senha');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        setErrorMessage('Credenciais inválidas');
        return;
      }

      const meResponse = await fetch('http://localhost:9090/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (!meResponse.ok) {
        setErrorMessage('Erro ao obter dados do usuário');
        return;
      }

      const userData = await meResponse.json();
      const role = userData?.authUser?.role;

      switch (role) {
        case 'TECHNIQUE_PEDAGOGICAL':
          router.push('/pedagogical-technique/inicio-pedagogical-technique');
          break;
        case 'STUDENT':
          router.push('/student/inicio-student');
          break;
        case 'TEACHER':
          router.push('/teacher/inicio-teacher');
          break;
        case 'SUPERVISOR':
          router.push('/supervisor/inicio-supervisor');
          break;
        case 'PEDAGOGICAL_ADVISOR':
          router.push('/pedagogical-advisor/inicio-pedagogical-advisor');
          break;
        default:
          setErrorMessage('Role não reconhecida');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao realizar login');
    }
  };

  return (
    <>
      <div className="w-full max-w-md space-y-8 select-none">
        <div className="text-center">
          <h2 className="bold text-5xl text-[#003366]">LOGIN</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="login h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Insira seu login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-t-0 border-x-0 border-b-2 rounded-none focus-visible:ring-0 focus:outline-none focus-visible:outline-none focus-visible:border-[#033377]"
            />
          </div>

          {errorMessage && (
            <div className="text-[var(--destructive)] text-center">
              {errorMessage}
            </div>
          )}

          <div className="login text-right mr-1.5">
            <a href="#" className="text-start text-[#003366] hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full hover:bg-[#002244] bg-[var(--foreground)] text-white text-2xl py-6"
          >
            Entrar
          </Button>
        </form>
      </div>
    </>
  );
}
