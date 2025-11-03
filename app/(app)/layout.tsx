"use client"
import Nav from "@/components/nav";
import Profile from "@/components/profile";
import Separator from "@/components/separator";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [solicitacoesExpandido, setSolicitacoesExpandido] = useState(false);
	const [sugestoesExpandido, setSugestoesExpandido] = useState(false);

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

			<aside className="w-80 h-full bg-white flex flex-col gap-4 p-5 overflow-y-auto">
				{/* Solicitações de amizade */}
				<div className="flex flex-col gap-3 w-full">
					<h2 className="font-semibold text-base text-center">Solicitações de amizade</h2>
					<div className={`space-y-3 ${!solicitacoesExpandido ? 'max-h-80 overflow-hidden' : ''}`}>
						{Array.from({ length: solicitacoesExpandido ? 10 : 3 }).map((_, i) => (
							<div key={i} className="flex flex-col gap-1">
								<div className="flex items-center gap-3">
									<Image 
										src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
										alt="Chico da Silva Betoneira"
										width={45}
										height={45}
										className="rounded-full"
									/>
									<div className="flex-1">
										<div className="font-semibold text-sm">Chico da Silva Betoneira</div>
									</div>
								</div>
								<div className="flex gap-2 justify-center">
									<button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700">
										aceitar
									</button>
									<button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300">
										rejeitar
									</button>
								</div>
							</div>
						))}
					</div>
					<button 
						onClick={() => setSolicitacoesExpandido(!solicitacoesExpandido)}
						className="flex items-center justify-center w-full py-1 hover:bg-gray-100 rounded transition-colors"
					>
						<ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${solicitacoesExpandido ? 'rotate-180' : ''}`} />
					</button>
				</div>

				<Separator />

				{/* Sugestões para você */}
				<div className="flex flex-col gap-3 w-full">
					<h2 className="font-semibold text-base text-center">Sugestões para você</h2>
					<div className={`space-y-3 ${!sugestoesExpandido ? 'max-h-80 overflow-hidden' : ''}`}>
						{Array.from({ length: sugestoesExpandido ? 10 : 4 }).map((_, i) => (
							<div key={i} className="flex items-center gap-3">
								<Image 
									src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
									alt="Chico da Silva Betoneira"
									width={45}
									height={45}
									className="rounded-full"
								/>
								<div className="flex flex-col">
									<div className="font-semibold text-sm">Chico da Silva Betoneira</div>
									<div className="text-sm text-gray-500">online há 2h</div>
								</div>
							</div>
						))}
					</div>
					<button 
						onClick={() => setSugestoesExpandido(!sugestoesExpandido)}
						className="flex items-center justify-center w-full py-1 hover:bg-gray-100 rounded transition-colors"
					>
						<ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${sugestoesExpandido ? 'rotate-180' : ''}`} />
					</button>
				</div>
			</aside>
		</div>
	);
}
