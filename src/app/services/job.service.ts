import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Job} from "../models/job";

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpClient: HttpClient) {}

  getJobList(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:3000/jobs");
  }

  getJobById(id: number): Observable<Job> {
    return this.httpClient.get<Job>(`http://localhost:3000/jobs/${id}`);
  }

  updateJob(job: Job): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:3000/jobs/${job.id}`, job);
  }

  createJob(job: Job): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/jobs", job);
  }

  deleteJob(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:3000/jobs/${id}`);
  }
}
