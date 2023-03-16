import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {JobListComponent} from "./list/job-list.component";
import {JobEditComponent} from "./edit/job-edit.component";

const jobRoutes: Routes = [
  {
    path: 'jobs',
    children: [
      {
        path: '',
        component: JobListComponent,
        data: { name: 'Список счетов' },
      },
      {
        path: 'new',
        component: JobEditComponent,
      },
      {
        path: ':id',
        component: JobEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobRoutes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
