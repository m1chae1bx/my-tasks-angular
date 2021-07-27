import { List } from "./list";

export interface Filters {
  list: { id: string, name: string };
  dueDate: { code: string, displayText: string }; 
  showCompleted: boolean;
}
  