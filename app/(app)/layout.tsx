
export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-[red] w-full h-screen">
			
				<aside className="w-80 h-full bg-white">
					{/* Conteúdo da esquerda aqui */}
					Esquerda
				</aside>

				<main className="flex-1 bg-gray-100">
					{/* Conteúdo principal aqui */}
					{children}
				</main>

				<aside className="w-80 h-full bg-white">
					{/* Conteúdo da direita aqui */}
					Direita
				</aside>
		</div>
	);
}