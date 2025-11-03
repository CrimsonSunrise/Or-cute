import { Compass, Home, Send, Settings } from "lucide-react";
import Link from "next/link";

const Nav = () => {
	return (
		<div className="text-gray-800 mx-8">
			<ul className="decoration-0 space-y-4">
				<li className="font-semibold flex items-center gap-2 hover:text-blue-500">
					<Home />
					<Link href="/feed">Feed</Link>
				</li>
				<li className="font-semibold flex items-center gap-2 hover:text-blue-500">
					<Compass />
					<Link href="/explorar">Explorar</Link>
				</li>
				<li className="font-semibold flex items-center gap-2 hover:text-blue-500">
					<Send />
					<Link href="/direct">Direct</Link>
				</li>
				<li className="font-semibold flex items-center gap-2 hover:text-blue-500">
					<Settings />
					<Link href="/configuracoes">Configurações</Link>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
