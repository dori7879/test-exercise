import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {Job} from "../../../models/job";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit{
  jobList: Job[] = [];

  constructor(
    private jobService: JobService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.jobService.getJobList()
      .subscribe((list) => {
        this.jobList = list;
      })
  }

  createJob(){
    void this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  deleteJob(id: number){
    this.jobService.deleteJob(id)
      .subscribe(() => {
        this.jobList = this.jobList.filter(job => job.id !== id)
      })
  }
}
