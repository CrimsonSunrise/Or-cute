interface ButtonProps {
  ativo?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ children, ativo = false, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 font-semibold transition-colors cursor-pointer
        ${ativo ? "bg-white text-blue-600" : "text-gray-400 hover:text-blue-600"} ${className || ""}`}
    >
      {children}
    </button>
  );
}