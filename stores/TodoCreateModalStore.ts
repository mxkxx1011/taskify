import { create } from 'zustand';

interface TodoCreateModalState {
  TodoCreateModalId: number | null;
  setOpenTodoCreateModal: (id: any) => void;
  setCloseTodoCreateModal: () => void;
}

const useTodoCreateModalStore = create<TodoCreateModalState>((set) => ({
  TodoCreateModalId: null,
  setOpenTodoCreateModal: (id: number) => set({ TodoCreateModalId: id }),
  setCloseTodoCreateModal: () => set({ TodoCreateModalId: null }),
}));

export default useTodoCreateModalStore;
