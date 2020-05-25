import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { Task } from "../../Modele/Task";
import * as $ from 'jquery';

@Component({
  selector: 'app-toutes-les-taches',
  templateUrl: './toutes-les-taches.component.html',
  styleUrls: ['./toutes-les-taches.component.scss']
})
export class ToutesLesTachesComponent implements OnInit {

  Projets: Project[]
  TasksSolitaires: Task[]

  constructor(private services: ServiceImpl) { }

  ngOnInit(): void {
    this.services.Load();
    this.Projets = this.services.GetProjets();
    this.TasksSolitaires = this.services.GetAllTachesSolitaires();

    if(this.TasksSolitaires.length > 0)
      $('#tachesSolitairesVide').hide();

    if(this.Projets.length > 0)
      $('#listeProjetVide').hide();
  }

}
