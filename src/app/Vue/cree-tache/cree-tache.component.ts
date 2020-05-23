import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Task } from "../../Modele/Task";
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-cree-tache',
  templateUrl: './cree-tache.component.html',
  styleUrls: ['./cree-tache.component.scss']
})
export class CreeTacheComponent implements OnInit {

  tache: Task;
  nomTache: String;
  nomProjet: String;
  projets: Project[];
  projetChoisi: Project;

  constructor(private services: ServiceImpl,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.nomTache = this.route.snapshot.paramMap.get('nom');
    this.nomProjet = this.route.snapshot.paramMap.get('projet');
    this.projets = this.services.GetProjets();

    if(this.nomTache != "empty"){
      this.tache = this.services.TrouverTache(this.nomTache);
    }
    else{
      this.tache = {name: "none", start: new Date(), duration: new Date(), running: false}
      $('#temps').hide();
      $('#supprimer').hide();
    }

    if(this.nomProjet != "empty"){
      this.projetChoisi = this.services.TrouverProjet(this.nomProjet);
    }
  }

  onEnregistrer(){

  }

  onReset(){

  }

  onSupprimer(){
    console.log("supprimé");
    this.services.RemoveTache(this.tache.name);
    this.router.navigate(['']);
  }

  onSelect(projet: Project){
    console.log("On a choisi " + projet.name);

    this.projetChoisi = projet;
  }
}
