import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Info } from 'lucide-react';

export default function ClassForm() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative rounded-lg shadow-md p-4 md:p-10 bg-[#003366] text-white w-full">
        <Button
          variant="ghost"
          size="icon"
          className="text-white absolute top-4 right-4"
        >
          <Edit style={{ width: "24px", height: "24px" }} />
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Curso */}
          <div>
            <label className="block text-lg font-medium mb-2">Curso</label>
            <Input
              className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4"
              defaultValue="JGS - AI PSIN 2023/2 INTI"
            />
          </div>

          {/* Carga Horária */}
          <div>
            <label className="block text-lg font-medium mb-2">Carga horária</label>
            <div className="relative flex items-center">
              <Input
                className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4"
                defaultValue="2800 horas"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-white absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Edit style={{ width: "24px", height: "24px" }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white absolute right-8 top-1/2 transform -translate-y-1/2"
              >
                <Info style={{ width: "24px", height: "24px" }} />
              </Button>
            </div>
          </div>

          {/* Nome da turma */}
          <div>
            <label className="block text-lg font-medium mb-2">Nome da turma</label>
            <Input
              className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4"
              defaultValue="MI74"
            />
          </div>

          {/* Quantidade de alunos */}
          <div>
            <label className="block text-lg font-medium mb-2">Quantidade de alunos</label>
            <Input
              className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4"
              defaultValue="0"
            />
          </div>

          {/* Alunos */}
          <div>
            <label className="block text-lg font-medium mb-2">Alunos</label>
            <Input
              className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-8 h-24"
              defaultValue="Os alunos aparecerão aqui :)"
            />
          </div>

          {/* Turno/Horário */}
          <div>
            <label className="block text-lg font-medium mb-2">Turno/Horário</label>
            <div className="flex items-center">
              <Input
                className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4 w-32"
                defaultValue="13:40"
              />
              <span className="mx-2 text-xl">à</span>
              <Input
                className="bg-white text-xl text-[#003366] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary py-4 w-32"
                defaultValue="22:00"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4 flex-wrap">
          <Button variant="destructive" className="text-lg py-3 px-8 mb-2 md:mb-0" style={{ backgroundColor: '#F13F00' }}>Cancelar</Button>
          <Button className="text-lg py-3 px-8" style={{ backgroundColor: '#319F43', color: 'white' }}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
}