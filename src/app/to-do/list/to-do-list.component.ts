import { Component, OnInit } from '@angular/core';
import { TodoService } from '../to-do.service';
import { IToDo } from '../to-do';
import { FormGroup, FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  styles: [`
  .list-group-item.list-group-item-action.todo-done {
      text-decoration: line-through;
  }
`],
  templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent implements OnInit {
  searchForm = new FormGroup({ query: new FormControl('') });
  isAdmin = false;

  constructor(
    private toDoService: TodoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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

  goToToDo(todo: IToDo): void {
    this.router.navigate([`./${todo.id}`], { relativeTo: this.route });
  }

  markDone(todo: IToDo, event: Event): void {
    event.stopPropagation();
    this.toDoService.markDone(todo.id).subscribe((answer) => {
      Object.assign(todo, answer);
    },
      (error) => {
        console.log('mark done failed');
      },
    );
  }

}
