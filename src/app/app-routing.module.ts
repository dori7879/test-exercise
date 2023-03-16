import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {JobListComponent} from "./modules/jobs/list/job-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: "full"
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./modules/jobs/jobs.module').then(
        (m) => m.JobsModule
      ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
