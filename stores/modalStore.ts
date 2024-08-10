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

interface ManageModalState {
  ManageModalId: number | null;
  setOpenManageModal: (id: any) => void;
  setCloseManageModal: () => void;
}

const useManageModalStore = create<ManageModalState>((set) => ({
  ManageModalId: null,
  setOpenManageModal: (id) => set({ ManageModalId: id }),
  setCloseManageModal: () => set({ ManageModalId: null }),
}));

const useInviteModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setOpenModal: () => set({ isModalOpen: true }),
  setCloseModal: () => set({ isModalOpen: false }),
}));

export { useCreateModalStore, useManageModalStore, useInviteModalStore };
