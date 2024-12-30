import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { UserServiceService } from '../../../../core/services/user/user-service.service';
import { TaskStatusBoardComponent } from "../task-status-board/task-status-board.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TaskStatusBoardComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks$ = new BehaviorSubject<Task[]>([]);
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  filterPriority: string = '';
  filterStatus: string = '';
  filterAssignedTo: string = '';
  users: string[] = [];


  constructor(
    private taskService: TaskService,
    private userService: UserServiceService) {
  }

  ngOnInit(): void {
    // Fetch tasks and users
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks$.next(tasks);
      this.applyFilters();
    });
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  applyFilters(): void {
    const tasks = this.tasks$.value;
    // Apply filters
    this.filteredTasks = tasks.filter((task) => {
      const matchesSearch =
        this.searchTerm === '' ||
        task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesPriority =
        this.filterPriority === '' || task.priority === this.filterPriority;

      const matchesStatus =
        this.filterStatus === '' || task.status === this.filterStatus;

      const matchesAssignedTo =
        this.filterAssignedTo === '' || task.assignedTo === this.filterAssignedTo;

      return matchesSearch && matchesPriority && matchesStatus && matchesAssignedTo;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterPriority = '';
    this.filterStatus = '';
    this.filterAssignedTo = '';
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

}
