import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Info } from 'lucide-react';

export default function ClassForm() {
  return (
    <div className="rounded-lg shadow-md p-6 bg-[#003366] text-white w-full max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">
        <span className="text-white/60">&lt;</span> TURMA AI PSIN 2023/2
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Curso */}
        <div>
          <label className="block text-sm font-medium mb-2">Curso</label>
          <Input
            className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            defaultValue="JGS - AI PSIN 2023/2 INTI"
          />
        </div>

        {/* Carga Horária */}
        <div>
          <label className="block text-sm font-medium mb-2">Carga horária</label>
          <div className="relative flex items-center">
            <Input
              className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              defaultValue="2800 horas"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-white absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              <Edit style={{ width: "20px", height: "20px" }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white absolute right-8 top-1/2 transform -translate-y-1/2"
            >
              <Info style={{ width: "20px", height: "20px" }} />
            </Button>
          </div>
        </div>

        {/* Nome da turma */}
        <div>
          <label className="block text-sm font-medium mb-2">Nome da turma</label>
          <Input
            className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            defaultValue="MI74"
          />
        </div>

        {/* Alunos */}
        <div>
          <label className="block text-sm font-medium mb-2">Alunos</label>
          <Input
            className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            defaultValue="Os alunos aparecerão aqui :)"
          />
        </div>

        {/* Turno/Horário */}
        <div>
          <label className="block text-sm font-medium mb-2">Turno/Horário</label>
          <div className="flex items-center">
            <Input
              className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary w-24"
              defaultValue="13:40"
            />
            <span className="mx-2">à</span>
            <Input
              className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary w-24"
              defaultValue="22:00"
            />
          </div>
        </div>

        {/* Quantidade de alunos */}
        <div>
          <label className="block text-sm font-medium mb-2">Quantidade de alunos</label>
          <Input
            className="bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            defaultValue="0"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="destructive">Cancelar</Button>
        <Button variant="secondary">Confirmar</Button>
      </div>
    </div>
  );
}