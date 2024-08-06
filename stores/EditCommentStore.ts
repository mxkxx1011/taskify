import { create } from 'zustand';

interface EditCommentState {
  CommentId: number | null;
  setOpenEditComment: (id: number) => void;
  setCloseEditComment: () => void;
}

const useEditCommentStore = create<EditCommentState>((set) => ({
  CommentId: null,
  setOpenEditComment: (id) => set({ CommentId: id }),
  setCloseEditComment: () => set({ CommentId: null }),
}));

export default useEditCommentStore;
