import { Component, OnInit } from '@angular/core';
import { TodoTypeView, TypeView_Enum } from '../../models/TodoTypeView';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  todoTypeView: TodoTypeView = new TodoTypeView(TypeView_Enum.PROJECTS,"What's next?","Advance Work");
  
  
  products!: String[];

  selectedProduct!: string;;

  constructor() { }

  ngOnInit(): void {
  }

  onRowSelect(event:any) {
    console.log("first");
}

}
