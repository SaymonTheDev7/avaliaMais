import Image from 'next/image';
import LoginForm from '@/components/login-form'; // Importa se estiver separado

export default function LoginPage() {
  return (
    <div className="relative flex h-screen">
      <div className="absolute top-0 left-0 w-screen bg-[#003366] p-4 z-20">
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

      <div className="relative w-2/3 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0">
          <Image
            src="/Login-image.png"
            alt="Students in a library"
            fill
            quality={100}
            className="object-cover opacity-100"
          />
        </div>

        <div className="absolute inset-0 flex items-center z-10 p-16">
          <div className="text-white text-4xl md:text-5xl font-bold select-none">
            <p>O estudo é a</p>
            <p className="text-[#FF5722]">BASE</p>
            <p>do sucesso!</p>
          </div>
        </div>
      </div>

      <div className="w-1/3 flex items-center justify-center p-8 ">
        <LoginForm />
      </div>
    </div>
  );
}
