import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../model/task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', (done) => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].taskName).toBe('Test Task');
      expect(tasks[1].taskName).toBe('Second Task');
      done();
    });
  });

  it('should fetch task by ID', (done) => {
    service.getTaskById(1).subscribe((task) => {
      expect(task).toBeTruthy();
      expect(task.id).toBe(1);
      expect(task.taskName).toBe('Test Task');
      done();
    });
  });

  it('should create a new task', (done) => {
    const newTask: Task = {
      id: 0,
      taskName: 'New Task',
      description: 'New Task Description',
      priority: 'Low',
      status: 'Pending',
      assignedTo: 'Islam',
      dueDate: 'Jan 1, 2025',
    };

    service.createTask(newTask);

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(3);
      expect(tasks[2].taskName).toBe('New Task');
      expect(tasks[2].id).toBe(3);
      done();
    });
  });

  it('should update an existing task', (done) => {
    const updatedTask: Task = {
      id: 1,
      taskName: 'Updated Task',
      description: 'Updated Description',
      priority: 'High',
      status: 'Completed',
      assignedTo: 'Islam',
      dueDate: 'Dec 31, 2024',
    };

    service.updateTask(1, updatedTask).subscribe((task) => {
      expect(task).toBeTruthy();
      expect(task.taskName).toBe('Updated Task');

      service.getTaskById(1).subscribe((retrievedTask) => {
        expect(retrievedTask.taskName).toBe('Updated Task');
        expect(retrievedTask.status).toBe('Completed');
        done();
      });
    });
  });

  it('should delete a task', (done) => {
    service.deleteTask(1);

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(2);
      done();
    });
  });
});
