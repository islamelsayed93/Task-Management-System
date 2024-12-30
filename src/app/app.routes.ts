import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/task/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'task-details',
    loadChildren: () =>
      import('./feature/view-task-details/view-task-details.module').then((m) => m.ViewTaskDetailsModule),
  },
];
