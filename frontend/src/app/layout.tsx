import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avalia +",
  description: "Sistema de conselho de classe",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
