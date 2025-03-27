import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function NotificationSettings() {
  return (
    <Card className="mb-4 bg-white"> {/* Card com fundo branco */}
      <CardHeader>
        <CardTitle className="text-[#02335E] text-2xl font-semibold">Notificações</CardTitle> {/* Título azul, um pouco menor */}
        <CardDescription className="text-[#02335E] text-base">Gerencie suas preferências de notificação.</CardDescription> {/* Descrição azul um pouco menor */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4"> {/* Menor espaçamento entre as opções */}
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <Checkbox 
              id="notificacoesEmail" 
              className="border-2 border-[#02335E] bg-white rounded-sm focus:ring-[#02335E] checked:bg-[#02335E]"  // Borda azul e foco azul
            />
            <Label htmlFor="notificacoesEmail" className="text-[#02335E] text-lg font-medium">Notificações por E-mail</Label> {/* Texto azul e tamanho ajustado */}
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <Checkbox 
              id="notificacoesPush" 
              className="border-2 border-[#02335E] bg-white rounded-sm focus:ring-[#02335E] checked:bg-[#02335E]"  // Borda azul e foco azul
            />
            <Label htmlFor="notificacoesPush" className="text-[#02335E] text-lg font-medium">Notificações Push</Label> {/* Texto azul e tamanho ajustado */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
