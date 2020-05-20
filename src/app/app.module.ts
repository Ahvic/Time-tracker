import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CreeProjetComponent } from './Vue/cree-projet/cree-projet.component';
import { ServiceImpl } from './Services/serviceImpl';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './Vue/principal/principal.component';
import { ProjetSimpleComponent } from './Vue/projet-simple/projet-simple.component';
import { ProjetDetailComponent } from './Vue/projet-detail/projet-detail.component';
import { TacheSimpleComponent } from './Vue/tache-simple/tache-simple.component';
import { CreeTacheComponent } from './Vue/cree-tache/cree-tache.component';

const appRoutes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'creerProjet', component: CreeProjetComponent },
  { path: 'detailProjet/:nom', component: ProjetDetailComponent },
  { path: 'creerTache/:nom/:projet', component: CreeTacheComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CreeProjetComponent,
    PrincipalComponent,
    ProjetSimpleComponent,
    ProjetDetailComponent,
    TacheSimpleComponent,
    CreeTacheComponent
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
