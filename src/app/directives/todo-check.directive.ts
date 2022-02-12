import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTodoCheck]'
})
export class TodoCheckDirective {

  @Input('color') color!: string;

  constructor(private eleRef: ElementRef) { 
    
  }

  @HostListener('change', ['$event'])
  changeListener(event: any) {
    if (event.target.checked) {
      // console.log("skhfkajsfglaksdfjbgsd",this.eleRef.nativeElement.style)
      this.eleRef.nativeElement.style.backgroundColor = this.color;
      this.eleRef.nativeElement.style.borderColor = this.color;
    } else {
      this.eleRef.nativeElement.style.backgroundColor = '#fff';
      this.eleRef.nativeElement.style.border = '1px solid rgba(0,0,0,.25)';
    }
  } 

}
