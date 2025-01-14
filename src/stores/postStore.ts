import { create } from 'zustand';
import { DanyPoste, SIGPoste } from '../interfaces/interfaces';
import { getDanyPosts, getSIGPosts } from '../utils/csvParser';

type PostsStore = {
  danyPosts: DanyPoste[];
  SIGPosts: SIGPoste[];
  mapCoord: number[];
  getDanyPosts: () => Promise<DanyPoste[]>;
  getSIGPosts: () => Promise<SIGPoste[]>;
  sendCoordToMapLeaflet: (lat: number, long: number) => void;
};

export const usePostsStore = create<PostsStore>((set) => {
  return {
    danyPosts: [],
    SIGPosts: [],
    mapCoord: [],
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
  };
});
