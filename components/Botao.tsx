interface BotaoProps {
  texto: string;
  ativo?: boolean;
  onClick?: () => void;
}

export default function Botao({ texto, ativo = false, onClick }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full font-semibold transition-colors
        ${ativo ? "bg-white text-blue-600" : "text-gray-400 hover:text-blue-600"}`}
    >
      {texto}
    </button>
  );
}
