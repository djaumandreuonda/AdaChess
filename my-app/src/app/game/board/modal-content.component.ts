import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title pull-left">Game over!</h4>
        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true" class="visually-hidden">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p>{{ gameOverMessage }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
        <button type="button" class="btn btn-primary" (click)="bsModalRef.hide()">Reset</button>
      </div>
    `,
    styleUrls: ['./board.component.css']
  })
   
  export class ModalContentComponent implements OnInit {
    gameOverMessage?: string;
    ngOnInit(){

    }
    constructor(public bsModalRef: BsModalRef) {}
  }