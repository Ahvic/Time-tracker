import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CreeProjetComponent } from './Vue/cree-projet/cree-projet.component';
import { ServiceImpl } from './Services/serviceImpl';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './Vue/principal/principal.component';

const appRoutes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'creerProjet', component: CreeProjetComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CreeProjetComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
