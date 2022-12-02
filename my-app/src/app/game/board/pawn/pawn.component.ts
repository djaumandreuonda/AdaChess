import { Component, Input } from '@angular/core';
import { Piece } from '../model/piece.model';

import { colour } from 'src/app/shared/enums/colour.enum';
import { type } from 'src/app/shared/enums/type.enum';
import { Pawn } from '../model/pawn.model';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent {
  @Input() pawnData!:Pawn;

}
