import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditTaskComponent } from './add-edit-task.component';
import { TaskService } from '../../services/task.service';
import { UserServiceService } from '../../../../core/services/user/user-service.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, provideRouter, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';
import { Task } from '../../model/task';
import { By } from '@angular/platform-browser';


describe('AddEditTaskComponent', () => {
  let component: AddEditTaskComponent;
  let fixture: ComponentFixture<AddEditTaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockUserService: jasmine.SpyObj<UserServiceService>;

  const mockTask: Task = {
    id: 1,
    taskName: 'Test Task',
    description: 'Task Description',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Islam',
    dueDate: '2024-12-31'
  };


  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById', 'createTask', 'updateTask']);
    mockUserService = jasmine.createSpyObj('UserServiceService', ['getUsers']);
    // Mock methods
    mockTaskService.getTaskById.and.returnValue(of(mockTask));
    mockUserService.getUsers.and.returnValue(of(['islam', 'yazan']));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddEditTaskComponent],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: mockTaskService },
        { provide: UserServiceService, useValue: mockUserService },
        provideRouter([], withComponentInputBinding()),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.taskForm).toBeTruthy();
    expect(component.taskForm.get('taskName')?.value).toBe('');
    expect(component.taskForm.get('priority')?.value).toBe('Medium');
    expect(component.taskForm.get('status')?.value).toBe('Pending');
  });

  it('should populate form in edit mode', () => {
    const mockTask = {
      id: 1,
      taskName: 'Test Task',
      description: 'Description',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Islam',
      dueDate: '2024-12-31',
    };
    mockTaskService.getTaskById.and.returnValue(of(mockTask as Task));
    component.taskId = '1';
    component.ngOnInit();

    expect(component.isEditMode).toBeTrue();
    expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.taskForm.value).toEqual({
      taskName: 'Test Task',
      description: 'Description',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Islam',
      dueDate: '2024-12-31',
    });
  });


  it('should fetch users and populate dropdown', () => {
    const mockUsers = ['Islam', 'Jane', 'Doe'];
    mockUserService.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();
    expect(mockUserService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should call createTask on form submit in add mode', () => {
    const mockTask = {
      taskName: 'New Task',
      description: 'Description',
      priority: 'Low',
      status: 'Pending',
      assignedTo: 'Jane',
      dueDate: '2024-12-31',
    };
    mockTaskService.createTask.and.stub();

    component.taskForm.setValue(mockTask);
    component.onSubmit();

    expect(mockTaskService.createTask).toHaveBeenCalledWith(mockTask as Task);
  });


  it('should call updateTask on form submit in edit mode', () => {
    const mockTask = {
      taskName: 'Updated Task',
      description: 'Updated Description',
      priority: 'High',
      status: 'Completed',
      assignedTo: 'Islam',
      dueDate: '2024-12-31',
    };
    component.isEditMode = true;
    component.taskId = '1';
    mockTaskService.updateTask.and.stub();

    component.taskForm.setValue(mockTask);
    component.onSubmit();

    expect(mockTaskService.updateTask).toHaveBeenCalledWith(1, mockTask as Task);
  });

  it('should disable submit button if form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    component.taskForm.get('taskName')?.setValue(''); // Make the form invalid
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeTrue();
  });


});
