import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  Title_forTodo:string = "All to do"
  Title_completed:string = "All tasks Completed"

  constructor() { }

  ngOnInit(): void {
  }

}
