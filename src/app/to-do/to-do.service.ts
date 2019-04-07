import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './to-do';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) { }

    saveTodos(todo: Todo) {
        return this.http.post<Todo>('http://localhost:3000', todo);
    }
}
