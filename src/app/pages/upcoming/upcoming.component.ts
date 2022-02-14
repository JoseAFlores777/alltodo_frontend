import { Component, OnInit } from '@angular/core';
import { TodoTypeView } from '../../models/TodoTypeView';
import { TypeView_Enum } from '../../models/enums';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  todoTypeView: TodoTypeView = new TodoTypeView(TypeView_Enum.UPCOMING,"What's next?","Advance Work");
  
  
  products!: String[];

  selectedProduct!: string;;

  constructor() { }

  ngOnInit(): void {
  }

  onRowSelect(event:any) {
    // console.log("first");
}

}
