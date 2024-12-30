import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-status-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-status-board.component.html',
  styleUrl: './task-status-board.component.scss'
})
export class TaskStatusBoardComponent {
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.pendingTasks = tasks.filter((task) => task.status === 'Pending');
      this.inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
      this.completedTasks = tasks.filter((task) => task.status === 'Completed');
    });
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, newStatus: 'Pending' | 'In Progress' | 'Completed'): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.previousContainer.data[event.previousIndex];
    task.status = newStatus;

    event.previousContainer.data.splice(event.previousIndex, 1);

    event.container.data.splice(event.currentIndex, 0, task);

    this.taskService.updateTask(task.id, task);
  }
}
