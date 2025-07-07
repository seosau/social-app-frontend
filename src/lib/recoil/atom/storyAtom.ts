import { IStory } from "@/interfaces/story.interfaces";
import { atom } from "recoil";

export const allStoryAtom = atom<IStory[]>({
    key: 'allStoryAtom',
    default: []
})