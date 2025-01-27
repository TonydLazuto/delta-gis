import { create } from "zustand"
import { DanyPoste, SIGPoste } from "../interfaces/interfaces"
// import { usePostsStore } from "./postStore"

type ComparedPostStoreType = {
  danyPost: DanyPoste | undefined
  SIGPost: SIGPoste | undefined
  setDanyPost: (danyPost: DanyPoste | undefined) => void
  setSIGPost: (SIGPost: SIGPoste| undefined) => void
}

export const useComparedPostStore = create<ComparedPostStoreType>((set) => {
  return {
    danyPost: undefined,
    SIGPost: undefined,
    setDanyPost: (curPost: DanyPoste | undefined) => {
      set((state) => ({...state, danyPost: curPost }))
    },
    setSIGPost: (curPost: SIGPoste | undefined) => {
      set((state) => ({...state, SIGPost: curPost }))
    },
  }
}
);
