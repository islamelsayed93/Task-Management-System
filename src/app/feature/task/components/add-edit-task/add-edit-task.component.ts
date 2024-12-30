import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../../core/services/user/user-service.service';
import { Task } from '../../model/task';
import { futureDateValidator } from '../../../../core/validators/date-validator.validator';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss'
})
export class AddEditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId = this.route.snapshot.paramMap.get('id');
  users: string[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, futureDateValidator]],
    });

    // Fetch users
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    // Check if edit mode
    if (this.taskId) {
      this.isEditMode = true;
      this.taskService.getTaskById(+this.taskId).subscribe((task) => {
        this.taskForm.patchValue(task);
      });
    }

  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;
    const task: Task = this.taskForm.value;
    if (this.isEditMode) {
      this.taskService.updateTask(+this.taskId!, task);
      this.router.navigate(['/'])
    } else {
      this.taskService.createTask(task);
      this.router.navigate(['/'])
    }

  }

  cancel(): void {
    this.router.navigate(['/']);
  }

}
