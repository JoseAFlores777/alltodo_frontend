import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
  
})
export class TodayComponent implements OnInit {

  value1:number = 1

  constructor() { }

  ngOnInit(): void {
  }

}
