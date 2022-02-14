import { Component, OnInit } from '@angular/core';
import { TodoTypeView } from '../../models/TodoTypeView';
import { TypeView_Enum } from '../../models/enums';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.css']
})
export class TomorrowComponent implements OnInit {

  todoTypeView: TodoTypeView = new TodoTypeView(TypeView_Enum.TOMORROW,"All for Tomorrow","Completed");

  constructor() { }

  ngOnInit(): void {
  }

}
