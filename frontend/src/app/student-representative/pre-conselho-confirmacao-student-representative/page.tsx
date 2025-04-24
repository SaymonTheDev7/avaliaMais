// app/(student-representative)/pre-conselho/confirmacao/page.tsx
export default function ConfirmacaoPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold text-blue-700">Feedback enviado com sucesso! 🎉</h1>
          <p className="text-gray-600">
            Agradecemos por compartilhar seu feedback. Ele será considerado com carinho no conselho!
          </p>
          <a href="/home" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Voltar para a página inicial
          </a>
        </div>
      </div>
    );
  }
  