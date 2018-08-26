import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BattleShipComponent } from './components/battle-ship/battle-ship.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from "ng6-toastr";

@NgModule({
  declarations: [
    AppComponent,
    BattleShipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
