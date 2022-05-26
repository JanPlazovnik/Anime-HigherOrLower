import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import FailScreen from "./components/FailScreen";
import MainMenu from "./components/MainMenu";
import {CurrentPanel, VotePanel} from "./components/VotePanel";
import { scoreState } from "./recoil";
import { Anime } from "./types/anilist";
import { fetchRandomAnime } from "./utils/animeUtil";

enum State {
    MAIN_MENU,
    PLAYING,
    FAILED
}

function App() {
    const [highscore, setHighScore] = useRecoilState(scoreState);
    const [gameState, setGameState] = useState<State>(State.MAIN_MENU);
    const [score, setScore] = useState(0);
    const [left, setLeft] = useState<Anime|null>(null);
    const [right, setRight] = useState<Anime|null>(null);

    function startGame() {
        setScore(0);
        fetchRandomAnime().then(data => setLeft(data));
        fetchRandomAnime().then(data => setRight(data));
        setGameState(State.PLAYING);
    }

    useEffect(() => {
        if (!highscore) {
            setHighScore({ highscore: score });
            localStorage.setItem("anime-hilo-state", JSON.stringify(highscore));
        }
    }, []);

    useEffect(() => {
        if (!highscore) return;
        if (score > highscore.highscore) {
            setHighScore({highscore: score})
        }
    }, [score]);

    useEffect(() => {
        localStorage.setItem("anime-hilo-state", JSON.stringify(highscore));
    }, [highscore]);

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

        setGameState(State.FAILED);
        setLeft(null);
        setRight(null);
    }

    if (gameState == State.MAIN_MENU) {
        return (<MainMenu cb={startGame}/>)
    }

    if (gameState == State.FAILED) {
        return (<FailScreen score={score} cb={startGame}/>)
    }

    if (!left || !right) {
        return (
            <div className="flex w-full h-full relative text-6xl w-full h-[100vh] justify-center items-center text-yellow-200 bg-gray-900">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row h-screen relative bg-gray-700">
            <CurrentPanel anime={left}/>
            <div className="flex items-center justify-center rounded-full bg-gray-700 text-yellow-200 text-3xl font-bold h-[6.25rem] w-[6.25rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
                VS
            </div>
            <VotePanel anime={right} onVote={onVote}/>
            {/* Score Panel */}
            <div className="bg-gray-800 text-white p-4 absolute bottom-0 left-0">High Score: {highscore?.highscore ?? 0}</div>
            <div className="bg-gray-800 text-white p-4 absolute bottom-0 right-0">Score: {score}</div>
        </div>
    )
}

export default App
