import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
@Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title pull-left">Winner</h4>
        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true" class="visually-hidden">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p>{{ winningColour}} won
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
      </div>
    `
  })
   
  export class ModalContentComponent implements OnInit {
    winningColour?: string;
    closeBtnName?: string;
    ngOnInit(){

    }
    constructor(public bsModalRef: BsModalRef) {}
  }