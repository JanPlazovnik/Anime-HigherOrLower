import { useEffect, useState } from "react"
import VotePanel from "./components/VotePanel";
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
        return (<h1>Loading</h1>)
    }

    return (
        <div className="flex w-full h-full">
            <VotePanel anime={left}/>
            <VotePanel anime={right}/>
        </div>
    )
}

export default App
