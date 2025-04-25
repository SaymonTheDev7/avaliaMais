"use client";

import React from 'react';
import ProfileCard from '@/components/profile-card';
import FeedbackSection from '@/components/feedback-section';
import Header from '@/components/header-administrator';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className="mt-20 container mx-auto py-8 px-4 max-w-4xl">
        <ProfileCard
 
          name="André Felipe Witt"
          turma="AI PSIN-2023/2 - MI74"
          horario="2° turno"
          contato="andre_witt@email.com"
          imageUrl="https://tryeasel.dev/placeholder.svg?width=200&height=200"
        />
        <FeedbackSection />
      </div>
    </>
  );
}
