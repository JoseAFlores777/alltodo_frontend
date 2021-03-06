import { Component, OnInit } from '@angular/core';
import { PrimeIcons, PrimeNGConfig } from 'primeng/api';

declare function mainInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    mainInitFunction();
  }

}
