import { atom } from "recoil";
import { GameState } from "../types/game";

export const scoreState = atom<GameState|null>({
    key: "anime-hilo-state",
    default: localStorage.getItem("anime-hilo-state") ? JSON.parse(localStorage.getItem("anime-hilo-state")!) : null
});