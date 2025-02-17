import { create } from 'zustand';
import { DanyPoste, SIGPoste } from '../interfaces/interfaces';
import { getDanyPosts, getSIGPosts } from '../utils/csvParser';

type PostsStore = {
  danyPosts: DanyPoste[];
  SIGPosts: SIGPoste[];
  mapCoord: number[];
  snackbarState: boolean;
  getDanyPosts: () => Promise<DanyPoste[]>;
  getSIGPosts: () => Promise<SIGPoste[]>;
  sendCoordToMapLeaflet: (lat: number, long: number) => void;
  setSnackbarState: (snackbarState: boolean) => void;
};

export const usePostsStore = create<PostsStore>((set) => {
  return {
    danyPosts: [],
    SIGPosts: [],
    mapCoord: [],
    snackbarState: false,
    getDanyPosts: async () => {
      const dany: DanyPoste[] = await getDanyPosts();
      set((state) => ({ ...state, danyPosts: dany }));
      return dany;
    },
    getSIGPosts: async () => {
      const SIG: SIGPoste[] = await getSIGPosts();
      set((state) => ({ ...state, SIGPosts: SIG }));
      return SIG;
    },
    sendCoordToMapLeaflet: (lat: number, long: number) => {
      set((state) => ({ ...state, mapCoord: [lat, long] }));
    },
    setSnackbarState: (curSnackbarState) => {
      set((state) => ({ ...state, snackbarState: curSnackbarState }));
    }
  };
});
