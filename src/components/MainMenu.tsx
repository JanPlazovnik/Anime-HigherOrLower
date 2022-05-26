export default function MainMenu({cb}: {cb: () => void}) {
    return (
        <div className="flex h-screen items-center flex-col justify-center bg-gray-700 text-white gap-[25px] bg-center bg-cover relative" style={{backgroundImage: "url(https://cdn.otagifs.com/uploads/posts/a1OwGj/video_gif.gif)"}}>
            <div className="bg-black opacity-[0.7] h-full w-full absolute"></div>
            <div className="flex flex-col items-center gap-[25px] z-[9999]">
                <h3 className="font-bold text-3xl">Which anime is more popular?</h3>
                <span>A game based on the popular <a href="https://www.higherlowergame.com/" target="_blank" className="text-yellow-200 underline">Higher Lower</a> game.</span>
                <button onClick={() => cb()} className="bg-transparent border-2 px-2 py-3 w-[12.5rem] text-yellow-200 font-bold border-solid border-white rounded-full hover:bg-white hover:text-black transition">
                    Start Game
                </button>
            </div>
        </div>
    )
}