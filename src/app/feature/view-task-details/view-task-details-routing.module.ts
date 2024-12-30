import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskComponent } from './components/view-task/view-task.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: ViewTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTaskDetailsRoutingModule { }
