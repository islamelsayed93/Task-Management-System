import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private taskIdCounter = 1;
  constructor() {
    const initialTasks: Task[] = [
      { id: 1, taskName: 'Test Task', description: 'Task Description', priority: 'High', status: 'Pending', assignedTo: 'Islam', dueDate: 'Dec 31, 2024' },
      { id: 2, taskName: 'Second Task', description: 'Another task', priority: 'Medium', status: 'In Progress', assignedTo: 'Yazan', dueDate: 'Dec 30, 2024' },
    ];
    this.tasksSubject.next(initialTasks);

    this.taskIdCounter = Math.max(...initialTasks.map(task => task.id)) + 1;
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTaskById(id: number): Observable<Task> {
    const task = this.tasksSubject.value.find((task) => task.id === id);
    return new Observable((observer) => {
      observer.next(task!);
      observer.complete();
    });
  }

  createTask(task: Task) {
    const tasks = this.tasksSubject.getValue();
    const newTask = { ...task, id: this.taskIdCounter++ };
    this.tasksSubject.next([...tasks, newTask]);
  }

  updateTask(id: number , updatedTask: Task): Observable<Task> {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      tasks[taskIndex] = { ...updatedTask, id };
      this.tasksSubject.next([...tasks]);
    }
    return of(updatedTask)
  }

  deleteTask(id: number) {
    const deleteTasks = this.tasksSubject.value.filter((task) => task.id !== id);
    this.tasksSubject.next(deleteTasks);
  }
}
