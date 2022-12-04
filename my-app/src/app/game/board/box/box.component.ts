import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Box } from '../model/box.model';
import { Coordinate } from '../model/coordinate.model';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input() box!:Box;
  @Output() coordinate = new EventEmitter<Coordinate>();;
  width = 50;
  height = 50;
  sendCoordinates(coordinate:Coordinate){ 
    this.coordinate.emit(coordinate);
  }
}