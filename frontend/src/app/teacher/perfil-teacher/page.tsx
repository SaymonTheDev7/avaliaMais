"use client";

import React from 'react';
import ProfileCard from '@/components/profile-card';
import FeedbackSection from '@/components/feedback-section';
import Header from '@/components/header';
import { ChevronLeft } from "lucide-react"
import Link from "next/link"


export default function ProfilePage() {
  return (
    <>
      <Header />

      <div className="flex items-center mb-6 px-4">
          <Link href="/teacher/inicio-teacher" className="text-[#003366] mr-4 mt-18 ml-40">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1 mt-18">
            Perfil
          </h1>
        </div>

      <div className=" container mx-auto py-8 pt-0 px-4 max-w-4xl">
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
