import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobEditComponent } from './edit/job-edit.component';
import { JobListComponent } from './list/job-list.component';
import {JobsRoutingModule} from "./jobs.routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbAlert, NgbDatepicker, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    JobEditComponent,
    JobListComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
    NgbDatepicker,
  ]
})
export class JobsModule { }
