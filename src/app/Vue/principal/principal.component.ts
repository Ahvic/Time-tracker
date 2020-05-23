import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { Task } from "../../Modele/Task";

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
    this.projets = this.services.GetProjets();
    this.tasksRunning = this.services.GetAllTachesRunning();
  }

  onSelect(projet: Project){
    console.log("Quelqu'un veut voir les détails de " + projet.name);

    //Ouvre la page de detail
    this.router.navigate(['/detailProjet', projet.name]);
  }
}
