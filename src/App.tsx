import { useEffect, useState } from "react"
import {CurrentPanel, VotePanel} from "./components/VotePanel";
import { Anime } from "./types/anilist";
import { fetchRandomAnime } from "./utils/animeUtil";

function App() {
    const [left, setLeft] = useState<Anime|null>(null);
    const [right, setRight] = useState<Anime|null>(null);

    useEffect(() => {
        // Fetch two on first load
        fetchRandomAnime().then(data => setLeft(data));
        fetchRandomAnime().then(data => setRight(data));
    }, []);

    if (!left || !right) {
        return (
            <div className="flex w-full h-full relative text-6xl w-full h-[100vh] justify-center items-center text-white bg-gray-700">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex w-full h-full relative bg-gray-700">
            <CurrentPanel anime={left}/>
            <div className="flex items-center justify-center rounded-full bg-gray-700 text-yellow-200 text-3xl font-bold text-black h-[6.25rem] w-[6.25rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
                VS
            </div>
            <VotePanel anime={right}/>
        </div>
    )
}

export default App
