import { ReactNode } from 'react';
import { create } from 'zustand';

const useToastStore = create<ToastStoreType>((set) => ({
  toastList: [],
  addToastList: (toast: IToast) =>
    set((state) => ({ toastList: [...state.toastList, toast] })),
  removeToastList: (id: string) =>
    set((state) => ({
      toastList: state.toastList.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
