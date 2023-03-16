import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobService} from "../../../services/job.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit{
  jobId: number;
  jobForm: FormGroup =  new FormGroup({
    job_title: new FormControl('', [Validators.required]),
    job_number: new FormControl('', [Validators.required]),
    job_start_date: new FormControl('', [Validators.required]),
    job_close_date: new FormControl('',[Validators.required]),
    experience_required: new FormControl(),
    number_of_openings: new FormControl(),
    job_notes: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    ) {
    this.jobId = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if(this.jobId) {
      this.jobService.getJobById(this.jobId)
        .subscribe(job => {
          const startDate = moment(job.job_start_date, 'YYYY-MM-DD').format('DD-MM-YYYY');
          const closeDate = moment(job.job_start_date, 'YYYY-MM-DD').format('DD-MM-YYYY');
          this.jobForm = new FormGroup({
            id: new FormControl(this.jobId),
            job_title: new FormControl(job.job_title, [Validators.required]),
            job_number: new FormControl(job.job_number, [Validators.required]),
            job_start_date: new FormControl(this.stringToDate(startDate),[Validators.required]),
            job_close_date: new FormControl(this.stringToDate(closeDate), [Validators.required]),
            experience_required: new FormControl(job.experience_required),
            number_of_openings: new FormControl(job.number_of_openings),
            job_notes: new FormControl(job.job_notes),
          });
        })
    }
  }

  stringToDate(value: string): any {
    const date = value.split('-');
    return {
      day: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      year: parseInt(date[2], 10),
    };
  }

  dateToString(date: NgbDateStruct | null): string {
    return date ? date.day + '-' + date.month + '-' + date.year : '';
  }

  back(): void{
    void this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  save(){
    if(this.jobForm.valid){
      const newStartDate = this.dateToString(this.jobForm.get('job_start_date')?.value);
      const newCloseDate = this.dateToString(this.jobForm.get('job_close_date')?.value);
      this.jobForm.get('job_start_date')?.setValue(newStartDate)
      this.jobForm.get('job_close_date')?.setValue(newCloseDate)

      if(this.jobId){
        this.jobService.updateJob(this.jobForm.value)
          .subscribe(res => {
            void this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          })
      }else {
        this.jobService.createJob(this.jobForm.value)
          .subscribe(res => {
            void this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          })
      }
    }
  }
}
