import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-info',
  templateUrl: './to-do-info.component.html'
})
export class ToDoInfoComponent implements OnInit {

  constructor(private toDoService: TodoService) { }

  toDoForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  toDo: any;

  ngOnInit() {
    this.getToDo(1);
  }
  getToDo(id: number): void {
    this.toDoService.getById(id)
      .subscribe(
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

    this.toDoService.saveTodos(this.toDoForm.value).subscribe(
      (response) => {
        console.log('Saved Todo');
      },
      (error) => {
        console.log('failed saving toDo');
      },
    );
  }


}
