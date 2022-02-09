import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-progress-bar-loader',
  templateUrl: './progress-bar-loader.component.html',
  styleUrls: ['./progress-bar-loader.component.css']
})
export class ProgressBarLoaderComponent implements OnInit {

  constructor(public loaderService:LoaderService) { }

  ngOnInit(): void {
  }

}
