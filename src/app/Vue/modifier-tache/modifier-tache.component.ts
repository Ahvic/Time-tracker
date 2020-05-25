import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"
import { Task } from "../../Modele/Task";
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.scss']
})
export class ModifierTacheComponent implements OnInit {

  projets: Project[];
  ancienNom: string;
  tache: Task;

  constructor(private services: ServiceImpl,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.projets = this.services.GetProjets();
    this.ancienNom = this.route.snapshot.paramMap.get("nom");
    this.tache = this.services.TrouverTache(this.ancienNom);
  }

  onSubmit(form: NgForm){

    if(form.value.nom != ""){
      this.services.ModifierTache(this.ancienNom, form.value.nom, form.value.projet);
    }
    else
      this.services.ModifierTache(this.ancienNom, this.ancienNom, form.value.projet);

    this.router.navigate(['']);
  }

  onResetDuration(){
    this.services.ResetDurationTache(this.tache.name);
  }
}
