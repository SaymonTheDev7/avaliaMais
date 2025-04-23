"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/contexts/theme-context"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-[var(--foreground)] text-xl">Aparência</CardTitle>
        <CardDescription className="text-[var(--foreground)] text-lg">
          Personalize a aparência e o estilo do aplicativo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between text-lg">
            <Label htmlFor="theme" className="text-[var(--foreground)] text-lg">
              Tema
            </Label>
            <Select value={theme} onValueChange={(value: string) => setTheme(value as "light" | "dark" | "system")}>
              <SelectTrigger id="theme" className="w-32 select-trigger" >
                <SelectValue placeholder="Sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system" className="select-item">
                  Sistema
                </SelectItem>
                <SelectItem value="light" className="select-item">
                  Claro
                </SelectItem>
                <SelectItem value="dark" className="select-item">
                  Escuro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
