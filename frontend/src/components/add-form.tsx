import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

    const form = event.target as HTMLFormElement; // Type assertion to HTMLFormElement
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
    <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#02335E] mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name} className="block text-lg font-medium text-[#02335E]">
              {field.label}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                name={field.name}
                className="mt-1 p-3 w-full border rounded-md focus:ring-0 focus:border-[#02335E]"
                required
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                name={field.name}
                className="mt-1 p-3 w-full border rounded-md focus:ring-0 focus:border-[#02335E]"
                required
              />
            )}
          </div>
        ))}
        <Button type="submit" className="w-full bg-[#003366] hover:bg-[#002244] text-white text-lg py-3">
          Salvar
        </Button>
      </form>
    </div>
  );
}