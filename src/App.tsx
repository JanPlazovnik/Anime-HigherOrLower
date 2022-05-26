import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import {CurrentPanel, VotePanel} from "./components/VotePanel";
import { scoreState } from "./recoil";
import { Anime } from "./types/anilist";
import { fetchRandomAnime } from "./utils/animeUtil";

function App() {
    const [gameState, setGameState] = useRecoilState(scoreState);
    const [score, setScore] = useState(0);
    const [left, setLeft] = useState<Anime|null>(null);
    const [right, setRight] = useState<Anime|null>(null);

    useEffect(() => {
        if (!gameState) {
            setGameState({ highscore: score });
            localStorage.setItem("anime-hilo-state", JSON.stringify(gameState));
        }
        // Fetch two on first load
        fetchRandomAnime().then(data => setLeft(data));
        fetchRandomAnime().then(data => setRight(data));
    }, []);

    useEffect(() => {
        if (!gameState) return;
        if (score > gameState.highscore) {
            setGameState({highscore: score})
        }
    }, [score]);

    useEffect(() => {
        localStorage.setItem("anime-hilo-state", JSON.stringify(gameState));
    }, [gameState]);

    if (!left || !right) {
        return (
            <div className="flex w-full h-full relative text-6xl w-full h-[100vh] justify-center items-center text-white bg-gray-700">
                Loading...
            </div>
        )
    }

    function onVote(vote: number) {
        if (!left || !right) return;

        if ((vote == 1 && right.popularity >= left.popularity) || (vote == -1 && right.popularity <= left.popularity)) {
            fetchRandomAnime().then(data => {
                setLeft(right);
                setRight(data);
                setScore(score + 1);
            });
            return;
        }

        fetchRandomAnime().then(data => setLeft(data));
        fetchRandomAnime().then(data => setRight(data));
        setScore(0);
    }

    return (
        <div className="flex w-full h-full relative bg-gray-700">
            <CurrentPanel anime={left}/>
            <div className="flex items-center justify-center rounded-full bg-gray-700 text-yellow-200 text-3xl font-bold h-[6.25rem] w-[6.25rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
                VS
            </div>
            <VotePanel anime={right} onVote={onVote}/>
            {/* Score Panel */}
            <div className="bg-gray-800 text-white p-4 absolute bottom-0 left-0">High Score: {gameState?.highscore ?? 0}</div>
            <div className="bg-gray-800 text-white p-4 absolute bottom-0 right-0">Score: {score}</div>
        </div>
    )
}

export default App
