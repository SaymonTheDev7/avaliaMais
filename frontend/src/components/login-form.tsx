import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await fetch('http://localhost:9090/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        setErrorMessage('Credenciais inválidas');
        setLoading(false);
        return;
      }

      const meResponse = await fetch('http://localhost:9090/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (!meResponse.ok) {
        setErrorMessage('Erro ao obter dados do usuário');
        setLoading(false);
        return;
      }

      const userData = await meResponse.json();
      const role = userData?.authUser?.role;

      switch (role) {
        case 'TECHNIQUE_PEDAGOGICAL':
          return router.push('/pedagogical-technique/inicio-pedagogical-technique');
        case 'STUDENT':
          return router.push('/student/inicio-student');
        case 'TEACHER':
          return router.push('/teacher/inicio-teacher');
        case 'SUPERVISOR':
          return router.push('/supervisor/inicio-supervisor');
        case 'PEDAGOGICAL_ADVISOR':
          return router.push('/pedagogical-advisor/inicio-pedagogical-advisor');
        default:
          setErrorMessage('Role não reconhecida');
          setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao realizar login');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen isLoading={loading} />;
  }

  return (
    <div className="w-full max-w-md space-y-8 select-none">
      <div className="text-center">
        <h2 className="font-bold text-5xl text-[#003366]">LOGIN</h2>
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

        <div className="text-right mr-1.5">
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
  );
}

