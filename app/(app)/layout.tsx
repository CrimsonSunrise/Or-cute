import Nav from "@/components/nav";
import Profile from "@/components/profile";
import Separator from "@/components/separator";
import Image from "next/image";

export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex w-full h-screen">
			<aside className="w-80 h-full bg-white flex flex-col gap-2">
				{/* Conteúdo da esquerda aqui */}
				<Profile />

				<Separator />

				<Nav />

				<Separator />

				<div className="px-8">
					<div className="flex gap-2">
						<Image 
							src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
							alt="Descrição da imagem"
							width={60}
							height={60}
						/>
						<div className="flex flex-col">
							<div>Chico da Silva Betoneira</div>
							<div className="text-gray-">online há 2h</div>
						</div>
					</div>
				</div>

			</aside>

			<main className="flex-1 bg-gray-100">
				{/* Conteúdo principal aqui */}
				{children}
			</main>

			<aside className="w-80 h-full bg-white flex flex-col gap-2">
				{/* Conteúdo da direita aqui */}
				Direita
			</aside>
		</div>
	);
}
