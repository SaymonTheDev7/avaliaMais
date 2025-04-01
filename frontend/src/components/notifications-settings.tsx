import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function NotificationSettings() {
  return (
    <Card className="mb-4 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-[#02335E] text-2xl font-semibold">Notificações</CardTitle>
        <CardDescription className="text-[#02335E] text-base">
          Gerencie suas preferências de notificação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="flex items-center justify-between  rounded-lg">
            <Label htmlFor="notificacoesEmail" className="text-[#02335E] text-lg font-medium">
              Notificações por E-mail
            </Label>
            <Switch className="switch" id="notificacoesEmail" />
          </div>
          <div className="flex items-center justify-between rounded-lg">
            <Label htmlFor="notificacoesPush" className="text-[#02335E] text-lg font-medium">
              Notificações Push
            </Label>
            <Switch className="switch" id="notificacoesPush" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
