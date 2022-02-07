import { Component, OnInit } from '@angular/core';

  declare function commonInitFunctions():any;
 declare function customInitFunctions():any;
declare function styleSwitcherInitFunction():any;
declare function gleekInitFunction():any;
//  declare function settingInitFunctions():any;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      commonInitFunctions();
      customInitFunctions();
    // settingInitFunctions();
     gleekInitFunction();
    styleSwitcherInitFunction();
    
  }

}
