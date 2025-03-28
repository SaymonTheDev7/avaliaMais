import React from 'react';
import Header from '@/components/header';
import ClassForm from '@/components/class-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main className="flex justify-center items-center p-4">
        <ClassForm />
      </main>
    </div>
  );
}