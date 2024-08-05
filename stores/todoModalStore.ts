import { create } from 'zustand';

interface TodoModalState {
  TodoModalId: number | null;
  setOpenTodoModal: (id: number) => void;
  setCloseTodoModal: () => void;
}

const useTodoModalStore = create<TodoModalState>((set) => ({
  TodoModalId: null,
  setOpenTodoModal: (id) => set({ TodoModalId: id }),
  setCloseTodoModal: () => set({ TodoModalId: null }),
}));

export default useTodoModalStore;
