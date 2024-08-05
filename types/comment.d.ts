interface IAuthor {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}
interface IComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: IAuthor;
}
