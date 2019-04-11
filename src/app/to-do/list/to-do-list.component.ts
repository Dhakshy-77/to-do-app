import { Component, OnInit } from '@angular/core';
import { TodoService } from '../to-do.service';
import { IToDo } from '../to-do';
import { FormGroup, FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent implements OnInit {
  searchForm = new FormGroup({ query: new FormControl('') });

  constructor(private toDoService: TodoService) {}

  todos: IToDo[];
  query = '';

  ngOnInit() {
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
    this.toDoService.get(this.query).subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }
}
