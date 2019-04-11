import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../to-do.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-do-info',
  templateUrl: './to-do-info.component.html',
})
export class ToDoInfoComponent implements OnInit {
  constructor(
    private toDoService: TodoService,
    private activeRoute: ActivatedRoute,
  ) {}

  toDoForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  toDo: any;

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('todoId');
    if (id !== 'add') {
      this.getToDo(+id);
    }
  }
  getToDo(id: number): void {
    this.toDoService.getById(id).subscribe(
      (todo) => {
        console.log(todo);
        this.toDo = todo;
        this.toDoForm.patchValue(todo);
      },
      (error) => {
        console.log('failed getting toDo by id');
      },
    );
  }

  save(): void {
    const todoToSave = this.toDoForm.value;
    todoToSave.id = this.toDo ? this.toDo.id : 0;
    this.toDoService.saveTodos(todoToSave).subscribe(
      (response) => {
        console.log('Saved Todo');
      },
      (error) => {
        console.log('failed saving toDo');
      },
    );
  }
}
