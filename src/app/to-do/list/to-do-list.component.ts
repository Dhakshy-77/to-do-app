import { Component, OnInit } from '@angular/core';
import { TodoService } from '../to-do.service';
import { IToDo } from '../to-do';
import { FormGroup, FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent implements OnInit {
  searchForm = new FormGroup({ query: new FormControl('') });
  isAdmin = false;

  constructor(
    private toDoService: TodoService,
    private authService: AuthService,
  ) {}

  todos: IToDo[];
  query = '';

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin.getValue();
    this.getToDos();
    this.searchForm
      .get('query')
      .valueChanges.pipe(debounceTime(350))
      .subscribe((value) => {
        console.log(value);
        this.query = value;
        this.getToDos();
      });
  }

  getToDos() {
    // have 2 different service endpoints
    // OR
    // or have the service determine what to do
    this.toDoService.get(this.query, this.isAdmin).subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }
}
