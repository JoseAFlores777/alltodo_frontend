import { Component, OnInit } from '@angular/core';

declare function mainInitFunction():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  ngOnInit(): void {

    mainInitFunction();
}
  title = 'alltodo-frontend';
}
