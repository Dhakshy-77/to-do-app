import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToDo } from './to-do';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<IToDo> {
    return this.http.get<IToDo>(`http://localhost:3000/todos/${id}`);
  }

  saveTodos(todo: IToDo): Observable<IToDo> {
    if (todo.id) {
      return this.http.put<IToDo>(`http://localhost:3000/todos`, todo);
    } else {
      return this.http.post<IToDo>('http://localhost:3000/todos', todo);
    }
  }

  get(text: string, isAdmin: boolean): Observable<IToDo[]> {
    if (isAdmin) {
      return this.http.get<IToDo[]>(
        `http://localhost:3000/todos/admin?name=${text}`,
      );
    } else {
      return this.http.get<IToDo[]>(`http://localhost:3000/todos?name=${text}`);
    }
  }
}
