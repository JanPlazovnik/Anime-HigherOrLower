import { atom } from "recoil";

export const scoreState = atom({
    key: "anime-hilo-state",
    default: localStorage.getItem("anime-hilo-state")
});