import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {


  public title: string = '';
  public titleSubs$: any;


  constructor(private router: Router, private route: ActivatedRoute) {
    this.titleSubs$ = this.getRouteArgument()
      .subscribe(({ title }) => { 
        this.title = title;
        document.title = `alltodo | ${this.title}`;
      });
   }



  getRouteArgument() {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }


}
