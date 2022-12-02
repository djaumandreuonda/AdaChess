import {Component, ElementRef, OnInit, Input} from '@angular/core';
import { Box } from '../model/box.model';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input() box!: Box;

  width = 50;
  height = 50;
  constructor() {
  }

  ngOnInit(): void {
  }
}