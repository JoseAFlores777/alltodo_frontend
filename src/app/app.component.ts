import { Component, OnInit } from '@angular/core';

declare function commonInitFunctions():any;
declare function customInitFunctions():any;
declare function styleSwitcherInitFunction():any;
declare function gleekInitFunction():any;
//  declare function settingInitFunctions():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  ngOnInit(): void {
    commonInitFunctions();
    customInitFunctions();
  // settingInitFunctions();
   gleekInitFunction();
  styleSwitcherInitFunction();
  
}
  title = 'alltodo-frontend';
}
