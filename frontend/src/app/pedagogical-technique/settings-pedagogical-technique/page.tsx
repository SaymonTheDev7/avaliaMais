"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/header';
import { NotificationSettings } from '@/components/notifications-settings';
import { AccessibilitySettings } from '@/components/accessibility-settings';
import { AppearanceSettings } from '@/components/appearance-settings';

const PaginaDeAjustes = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-6 text-[#02335E]">Ajustes</h1>
                <div className="mb-6">
                    <AppearanceSettings />
                </div>
                <div className="mb-6">
                    <AccessibilitySettings />
                </div>
                <div className="mb-6">
                    <NotificationSettings />
                </div>
                <Button className=" bg-[#02335E] hover:bg-[#011E3D] text-white text-xl py-3 px-8 rounded-lg">
                    Salvar Ajustes
                </Button>
            </div>
        </>
    );
};

export default PaginaDeAjustes;
