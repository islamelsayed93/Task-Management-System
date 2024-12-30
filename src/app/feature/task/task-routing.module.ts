import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: 'add',
    component: AddEditTaskComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
