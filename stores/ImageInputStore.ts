import { create } from 'zustand';

interface ImageState {
  imageUrl: string | null;
  setImage: (url: string) => void;
  clearImage: () => void;
}

const useImageStore = create<ImageState>((set) => ({
  imageUrl: null,
  setImage: (url) => set({ imageUrl: url }),
  clearImage: () => set({ imageUrl: null }),
}));

export default useImageStore;
