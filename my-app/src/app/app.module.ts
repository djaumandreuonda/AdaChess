import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { BoxComponent } from './game/board/box/box.component';

import { UpdateBoardService } from './shared/services/update-board.service';
import { HelperService } from './shared/services/helper.service';
import { AvailableMovesService } from './shared/services/available-moves.service';




@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [AvailableMovesService, UpdateBoardService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
