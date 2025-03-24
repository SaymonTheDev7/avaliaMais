import React from 'react';
import HomePage from '@/app/page'; // Ajuste o caminho conforme necessário

export const metadata = {
  title: 'Sua Página',
  description: 'Descrição da sua página',
};

export default function Layout() {
  return (
    <>
      <html lang="pt-br">
        <body>
          {/* Aqui você pode adicionar qualquer estrutura global, como barras de navegação, modais, etc. */}
          <HomePage />
        </body>
      </html>
    </>
  );
}
