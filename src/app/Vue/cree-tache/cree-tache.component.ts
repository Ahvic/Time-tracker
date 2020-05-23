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

  }

  onEnregistrer(){

  }

  onSelect(projet: Project){
    console.log("On a choisi " + projet.name);

    this.projetChoisi = projet;
  }
}
