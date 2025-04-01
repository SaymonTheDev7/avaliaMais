import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Edit, Info } from 'lucide-react';

interface FormField {
  label: string;
  type: string;
  name: string;
}

interface FormCardProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
}

export function FormCard({ title, fields, onSubmit }: FormCardProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData: { [key: string]: string } = {};

    fields.forEach((field) => {
      const element = form.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement;
      if (element) {
        formData[field.name] = element.value;
      }
    });

    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-[#003366] rounded-lg shadow-md text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <div className="flex items-center justify-between">
              <Label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}
              </Label>
              {field.label === 'Carga horária' && (
                <div className="absolute right-0 top-0 flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  <Info className="h-4 w-4" />
                </div>
              )}
            </div>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                name={field.name}
                className="mt-1 p-3 w-full border rounded-md focus:ring-0 focus:border-gray-300 text-black"
                required
                style={{ minHeight: '100px' }}
                placeholder={field.label === 'Alunos' ? 'Os alunos aparecerão aqui :)' : ''}
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                name={field.name}
                className="mt-1 p-3 w-full border rounded-md focus:ring-0 focus:border-gray-300 text-black"
                required
              />
            )}
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <Button variant="destructive" className="w-1/2 mr-2">
            Cancelar
          </Button>
          <Button type="submit" className="w-1/2 bg-green-500 hover:bg-green-700 text-white">
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}