export default function FailScreen({score, cb}: {score: number, cb: () => void}) {
    return (
        <h1 onClick={() => cb()}>You failed! Your score was {score}</h1>
    )
}