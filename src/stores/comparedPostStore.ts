import { create } from "zustand"
import { DanyPoste, SIGPoste } from "../interfaces/interfaces"
// import { usePostsStore } from "./postStore"

type ComparedPostStoreType = {
  danyPost: DanyPoste
  SIGPost: SIGPoste
  setDanyPost: (danyPost: DanyPoste) => void
  setSIGPost: (SIGPost: SIGPoste) => void
}

export const useComparedPostStore = create<ComparedPostStoreType>((set) => {
  return {
    danyPost: undefined,
    SIGPost: undefined,
    setDanyPost: (curPost: DanyPoste) => {
      set((state) => ({...state, danyPost: curPost }))
    },
    setSIGPost: (curPost: SIGPoste) => {
      set((state) => ({...state, SIGPost: curPost }))
    },
  }
}
);
