import Filtro from "@/components/filter";

const Feed = () => {
	return (
		<div className="p-8">
			<div className="flex items-center justify-between">
				<span className="font-bold text-xl">Feed</span>
				<Filtro/>
			</div>
		</div>
	)
}

export default Feed;