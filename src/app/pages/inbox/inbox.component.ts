import { Component, OnInit } from '@angular/core';
import { TodoTypeView, TypeView_Enum } from '../../models/TodoTypeView';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  
  todoTypeView: TodoTypeView = new TodoTypeView(TypeView_Enum.INBOX,"All to Do","Completed");
  Title_completed:string = "All tasks Completed"

  constructor() { }

  ngOnInit(): void {
  }

}
