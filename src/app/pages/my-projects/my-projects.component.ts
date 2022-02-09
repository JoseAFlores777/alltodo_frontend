import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  Title_forTodo:string = "All to do"
  Title_completed:string = "Finished"

  constructor() { }

  ngOnInit(): void {
  }

}
