import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
  getTaskLists(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks`);
  }
  updateTaskStatus(taskId: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.put(url, {status} );
  }

}
