import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CreeProjetComponent } from './cree-projet/cree-projet.component';
import { ServiceImpl } from './services/ServiceImpl';


@NgModule({
  declarations: [
    AppComponent,
    CreeProjetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
