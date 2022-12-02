import { Component, Input } from '@angular/core';
import { Pawn } from '../model/pawn.model';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent {
  @Input() pawnData!:Pawn;
}
