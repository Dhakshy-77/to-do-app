import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToDo } from './to-do';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<IToDo> {
        return this.http
            .get<IToDo>(`http://localhost:3000/todos/${id}`);
    }

    saveTodos(todo: IToDo): Observable<IToDo> {
        return this.http.post<IToDo>('http://localhost:3000/todos', todo);
    }
}
