import type { Metadata } from "next";
import "./globals.css";
import Home from "./page";


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
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}





