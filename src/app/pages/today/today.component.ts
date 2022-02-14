import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TodoTypeView } from '../../models/TodoTypeView';
import { TypeView_Enum } from '../../models/enums';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService,ConfirmationService]
  
})
export class TodayComponent implements OnInit {

  value1: number = 1
  
  todoTypeView: TodoTypeView = new TodoTypeView(TypeView_Enum.TODAY,"For Today","Completed");
  

  constructor( private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

}
