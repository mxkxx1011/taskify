import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

export default useModalStore;
