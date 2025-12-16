import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'https://localhost:7151/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  create(task: any) {
    return this.http.post(this.api, task);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  update(id: number, payload: any) {
    return this.http.put(`${this.api}/${id}`, payload);
  }
}
