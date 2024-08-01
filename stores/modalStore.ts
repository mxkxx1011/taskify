import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
}

const useCreateModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

const useManageModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

const useInviteModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

export { useCreateModalStore, useManageModalStore, useInviteModalStore };
