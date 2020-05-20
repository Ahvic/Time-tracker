import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Task } from "../../Modele/Task";
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cree-tache',
  templateUrl: './cree-tache.component.html',
  styleUrls: ['./cree-tache.component.scss']
})
export class CreeTacheComponent implements OnInit {

  tache: Task;
  nomTache: String;
  allProjects: Project[];

  constructor(private services: ServiceImpl,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    var nomTache = this.route.snapshot.paramMap.get('nom');
    var nomProjet = this.route.snapshot.paramMap.get('projet');

    this.allProjects = this.services.GetProjets();

    //Si c'est une nouvelle tâche à créer
    if (nomTache == '') {
      this.tache = new Task();
    }
    else{
      //Si le projet associé est spécifié, on le choisi dans la liste des projets

      //Sinon on fait R
    }
  }

  onSubmit(form: NgForm){
    //Dans tous les cas on re-crée la tache

    //Si la tâche exitait pas, créerTache()

    //Si on change le projet qui a la tache
  }

}
