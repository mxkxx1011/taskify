interface IAssignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

interface ICard {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: IAssignee;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
