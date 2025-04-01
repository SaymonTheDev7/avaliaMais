import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function NotificationSettings() {
  return (
    <Card className="mb-4 bg-white">
      <CardHeader>
        <CardTitle className="text-[#02335E] text-2xl font-semibold">Notificações</CardTitle>
        <CardDescription className="text-[#02335E] text-base">
          Gerencie suas preferências de notificação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <Checkbox 
              id="notificacoesEmail" 
              className="checkbox border-2 border-[#02335E] bg-white rounded-sm focus:ring-[#02335E]"
            />
            <Label htmlFor="notificacoesEmail" className="text-[#02335E] text-lg font-medium">
              Notificações por E-mail
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <Checkbox 
              id="notificacoesPush" 
              className="checkbox border-2 border-[#02335E] bg-white rounded-sm focus:ring-[#02335E]"
            />
            <Label htmlFor="notificacoesPush" className="text-[#02335E] text-lg font-medium">
              Notificações Push
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
