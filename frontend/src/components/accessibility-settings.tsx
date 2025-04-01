import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AccessibilitySettings() {

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-[var(--foreground)] text-xl">Acessibilidade</CardTitle>
        <CardDescription className="text-[var(--foreground)] text-lg">Ajuste as configurações para melhorar a acessibilidade.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between text-lg">
            <Label htmlFor="highContrast" className="text-[var(--foreground)] text-lg">Alto Contraste</Label>
            <Switch className="switch" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
