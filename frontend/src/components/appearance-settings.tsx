import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AppearanceSettings() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-[#02335E] text-xl">Aparência</CardTitle>
        <CardDescription className="text-[#02335E] text-lg">Personalize a aparência e o estilo do aplicativo.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-2 text-lg">
            <Label htmlFor="theme" className="text-[#02335E] text-lg">Tema</Label>
            <Select>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">Sistema</SelectItem>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
