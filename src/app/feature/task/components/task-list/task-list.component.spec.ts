import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { UserServiceService } from '../../../../core/services/user/user-service.service';
import { FormsModule } from '@angular/forms';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';
import { Task } from '../../model/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockUserService: jasmine.SpyObj<UserServiceService>;

  const mockTasks: Task[] = [
    { id: 1, taskName: 'Task 1', description: 'Description 1', priority: 'High', status: 'Pending', assignedTo: 'Islam', dueDate: '2024-12-31' },
    { id: 2, taskName: 'Task 2', description: 'Description 2', priority: 'Medium', status: 'In Progress', assignedTo: 'User 2', dueDate: '2024-12-31' }
  ];
  const mockUsers: string[] = ['Islam', 'User 2', 'User 3'];

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);
    mockUserService = jasmine.createSpyObj('UserServiceService', ['getUsers']);
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, FormsModule, RouterModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: UserServiceService, useValue: mockUserService },
        provideRouter([], withComponentInputBinding()),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    mockTaskService.getTasks.and.returnValue(of(mockTasks));
    mockUserService.getUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tasks and users on ngOnInit', () => {
    expect(component.tasks$.value).toEqual(mockTasks);
    expect(component.users).toEqual(mockUsers);
  });

  it('should apply filters correctly', () => {
    component.searchTerm = 'Task 1';
    component.filterPriority = 'High';
    component.filterStatus = 'Pending';
    component.filterAssignedTo = 'Islam';

    component.applyFilters();

    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].taskName).toBe('Task 1');
  });

  it('should reset filters correctly', () => {
    component.searchTerm = 'Task 1';
    component.filterPriority = 'Low';
    component.filterStatus = 'Completed';
    component.filterAssignedTo = 'Islam';

    component.resetFilters();

    expect(component.searchTerm).toBe('');
    expect(component.filterPriority).toBe('');
    expect(component.filterStatus).toBe('');
    expect(component.filterAssignedTo).toBe('');
  });

  it('should delete task correctly', () => {
    const taskId = 1;
    spyOn(window, 'confirm').and.returnValue(true); // Simulate confirmation dialog
    component.deleteTask(taskId);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('should not delete task if confirmation is canceled', () => {
    const taskId = 1;
    spyOn(window, 'confirm').and.returnValue(false); // Simulate cancellation of deletion

    component.deleteTask(taskId);

    expect(mockTaskService.deleteTask).not.toHaveBeenCalled();
  });

  it('should track tasks by id', () => {
    const index = 0;
    const task = mockTasks[0];

    const result = component.trackByTaskId(index, task);

    expect(result).toBe(task.id);
  });

});
