import { Anime } from "../types/anilist";

export function CurrentPanel({anime}: {anime: Anime}) {
    return (
        <div className="flex flex-col text-white justify-center items-center bg-center bg-cover w-full h-[100vh] relative" style={{backgroundImage: `url(${anime.coverImage.extraLarge})`}}>
            <div className="bg-black opacity-[0.7] h-full w-full absolute"></div>
            <div className="flex flex-col gap-[10px] z-[999] text-center">
                <h1 className="text-3xl font-bold">{anime.title.userPreferred}</h1>
                <span>has a popularity of </span>
                <span className="text-7xl font-bold text-yellow-200">{anime.popularity}</span>
            </div>
        </div>
    )
}

export function VotePanel({anime}: {anime: Anime}) {
    return (
        <div className="flex flex-col text-white justify-center items-center bg-center bg-cover w-full h-[100vh] relative" style={{backgroundImage: `url(${anime.coverImage.extraLarge})`}}>
            <div className="bg-black opacity-[0.7] h-full w-full absolute"></div>
            <div className="flex flex-col gap-[10px] z-[999] text-center items-center">
                <h1 className="text-3xl font-bold">{anime.title.userPreferred}</h1>
                <span>is</span>
                <button className="bg-transparent border-2 px-2 py-3 w-[12.5rem] text-yellow-200 font-bold border-solid border-white rounded-full hover:bg-white hover:text-black transition">
                    Higher
                </button>
                <button className="bg-transparent border-2 px-2 py-3 w-[12.5rem] text-yellow-200 font-bold border-solid border-white rounded-full hover:bg-white hover:text-black transition">
                    Lower
                </button>
            </div>
        </div>
    )
}