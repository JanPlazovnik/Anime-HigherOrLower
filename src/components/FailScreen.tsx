import { useEffect, useState } from "react";

interface Result {
    gif: string;
    message: string;
}

export default function FailScreen({score, cb}: {score: number, cb: () => void}) {
    const [result, setResult] = useState<Result|null>(null);

    useEffect(() => {
        const resultObj = {} as Result;
        console.log(score);

        if (score <= 2) {
            resultObj.gif = "https://cdn.otagifs.com/uploads/posts/oYyepO/video_gif.gif";
            resultObj.message = "That's a terrible score! Put some effort into it!";
        }
        else if (score <= 3) {
            resultObj.gif = "https://cdn.otagifs.com/uploads/posts/n6u_V1/video_gif.gif";
            resultObj.message = "Is this too hard for you?";
        }
        else if (score <= 6) {
            resultObj.gif = "https://cdn.otagifs.com/uploads/posts/Q-Xs6O/video_gif.gif";
            resultObj.message = "Not a bad score, keep at it!"
        }
        else {
            resultObj.gif = "https://cdn.otagifs.com/uploads/posts/f1P-8i/video_gif.gif";
            resultObj.message = "You’re really really good at this! Good job!"
        }
        setResult(resultObj);
    }, []);

    return (
        <div className="flex h-screen items-center flex-col justify-center bg-gray-700 text-white bg-center bg-cover relative text-center" style={{backgroundImage: `url(${result?.gif})`}}>
            <div className="bg-black opacity-[0.7] h-full w-full absolute"></div>
            <div className="flex flex-col items-center gap-[25px] z-[9999]">
                <h3 className="font-bold text-2xl">You scored:</h3>
                <h3 className="font-bold text-4xl text-yellow-200">{score}</h3>

                <span>{result?.message}</span>

                <button onClick={() => cb()} className="bg-transparent border-2 px-2 py-3 w-[12.5rem] text-yellow-200 font-bold border-solid border-white rounded-full hover:bg-white hover:text-black transition">
                    Play Again
                </button>
            </div>
        </div>
    )
}