import {Component, ElementRef, OnInit} from '@angular/core';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  colour:string; 
  width = 50;
  height = 50;
  constructor() {
    this.colour = "white";
   }

  ngOnInit(): void {
  }
  // onChange(event){
  //   console.log("Event = ", event);
  // }
}
