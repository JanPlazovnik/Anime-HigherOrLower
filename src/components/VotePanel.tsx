import { Anime } from "../types/anilist";

export default function VotePanel({anime}: {anime: Anime}) {
    return (
        <div className="flex flex-col text-white justify-center items-center bg-center bg-cover w-full h-[100vh] relative" style={{backgroundImage: `url(${anime.coverImage.extraLarge})`}}>
            <div className="bg-black opacity-[0.7] h-full w-full absolute"></div>
            <div className="flex flex-col gap-[10px] z-[999] text-center">
                <h1 className="text-3xl font-bold">{anime.title.userPreferred}</h1>
                <span>has</span>
                <span className="text-5xl font-bold text-yellow-500">{anime.popularity}</span>
            </div>
        </div>
    )
}