import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { Task } from "../../Modele/Task";
import * as $ from 'jquery';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  projets: Project[]
  tasksRunning: Task[]

  constructor(private services: ServiceImpl,
              private router: Router) { }

  ngOnInit(): void {
    this.services.Load();
    this.projets = this.services.GetProjets();
    this.tasksRunning = this.services.GetAllTachesRunning();

    if(this.tasksRunning.length > 0)
      $('#tacheEnCoursVide').hide();

    if(this.projets.length > 0)
      $('#listeProjetVide').hide();
  }

  onSelect(projet: Project){
    //Ouvre la page de detail
    this.router.navigate(['/detailProjet', projet.name]);
  }

  onQuickStart(){
    this.router.navigate(['/creerTache', "true"]);
  }
}
