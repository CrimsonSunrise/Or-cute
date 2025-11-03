import Image from "next/image";

const Profile = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-8 gap-6">
			<div className="flex flex-col items-center gap-2">
				<Image
					src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
					alt="Descrição da imagem"
					width={100}
					height={100}
				/>
				<div className="flex flex-col items-center gap-0 leading-2">
					<div className="font-semibold text-md text-gray-800">Chiquitita</div>
					<div className="text-sm text-gray-400">Cabecinha de melão</div>
				</div>
			</div>
			<div className="flex justify-between w-full px-8">
				<div className="flex flex-col items-center leading-3">
					<div className="font-bold text-gray-800">123</div>
					<div className="text-sm text-gray-400">Posts</div>
				</div>
				<div className="flex flex-col items-center leading-3">
					<div className="font-bold text-gray-800">123</div>
					<div className="text-sm text-gray-400">Seguidores</div>
				</div>
				<div className="flex flex-col items-center leading-3">
					<div className="font-bold text-gray-800">123</div>
					<div className="text-sm text-gray-400">Seguindo</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
