export interface Task {
  id: string;
  name: string;
  desc: string;
  listId: string;
  dueDate: Date;
  isCompleted: boolean;
}
  