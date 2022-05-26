export default function MainMenu({cb}: {cb: () => void}) {
    return (<h1 onClick={() => cb()}>start playing?</h1>)
}