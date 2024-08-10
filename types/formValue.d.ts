interface FormValues {
  assigneeUserId?: number | null;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
}
