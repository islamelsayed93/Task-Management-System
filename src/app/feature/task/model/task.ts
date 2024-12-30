export interface Task {
  id: number;
  taskName: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  dueDate: string;
}
