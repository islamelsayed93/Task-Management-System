import { Component, OnInit } from '@angular/core';
import { Task } from '../../../task/model/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../task/services/task.service';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {
  task: Task | undefined;
  taskId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.taskId) {
      this.taskService.getTaskById(+this.taskId).subscribe((task) => {
        this.task = task;
      }, error => {
        (prompt(error))
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
