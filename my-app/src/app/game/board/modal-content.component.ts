import { Component } from '@angular/core';
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
        <button type="button" class="btn btn-danger" (click)="bsModalRef.hide()">Close</button>
      </div>
    `
  })
   
  export class ModalContentComponent {
    gameOverMessage?: string;

    reset(){
      location.reload();
    }
    constructor(public bsModalRef: BsModalRef) {}
  }