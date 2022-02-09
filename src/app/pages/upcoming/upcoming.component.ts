import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  Title_forTodo:string = "What's Next?"
  Title_completed: string = "Advance Work"
  
  products!: String[];

  selectedProduct!: string;;

  constructor() { }

  ngOnInit(): void {
  }

  onRowSelect(event:any) {
    console.log("first");
}

}
