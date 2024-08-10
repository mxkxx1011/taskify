import { create } from 'zustand';

interface DeleteAlertModalState {
  AlertModalId: number | null;
  setOpenAlertModal: (id: number | null) => void;
  setCloseAlertModal: () => void;
}

const useDeleteAlertModalStore = create<DeleteAlertModalState>((set) => ({
  AlertModalId: null,
  setOpenAlertModal: (id: number | null) => set({ AlertModalId: id }),
  setCloseAlertModal: () => set({ AlertModalId: null }),
}));

export default useDeleteAlertModalStore;
