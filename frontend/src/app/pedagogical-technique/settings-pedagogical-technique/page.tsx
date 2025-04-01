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
                <h1 className="text-4xl font-bold mb-6 text-[var(--color-foreground)]">Ajustes</h1>
                <div className="mb-6">
                    <AppearanceSettings />
                </div>
                <div className="mb-6">
                    <AccessibilitySettings />
                </div>
                <div className="mb-6">
                    <NotificationSettings />
                </div>
                <Button className="bg-[var(--background-foreground)] hover:bg-[var(--foreground)] text-[var(--color-primary-foreground)] text-xl py-3 px-8 rounded-lg">
                    Salvar Ajustes
                </Button>
            </div>
        </>
    );
};

export default PaginaDeAjustes;
