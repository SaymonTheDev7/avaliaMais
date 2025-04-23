"use client"
import Header from "@/components/header"
import { NotificationSettings } from "@/components/notifications-settings"
import { AccessibilitySettings } from "@/components/accessibility-settings"
import { AppearanceSettings } from "@/components/appearance-settings"

const PaginaDeAjustes = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6 text-[var(--foreground)]">Ajustes</h1>
        <div className="mb-6">
          <AppearanceSettings />
        </div>
        <div className="mb-6">
          <AccessibilitySettings />
        </div>
        <div className="mb-6">
          <NotificationSettings />
        </div>
      </div>
    </>
  )
}

export default PaginaDeAjustes
