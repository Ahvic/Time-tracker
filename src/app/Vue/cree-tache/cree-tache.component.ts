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

  projets: Project[];
  quickstart: boolean;

  constructor(private services: ServiceImpl,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.projets = this.services.GetProjets();
    this.quickstart = (this.route.snapshot.paramMap.get("quickstart") == "true");

    if(!this.quickstart){
      $('#baniereQuick').hide();
    }else{
      $('#baniereNormal').hide();
      $('#demarrage').hide();
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);

    if(form.value.nom != ""){
      if(this.quickstart || form.value.demarrage)
        this.services.QuickStart(form.value.nom);
      else
        this.services.CreeTache(form.value.nom);

      if(form.value.projet != "null" && form.value.projet != "")
        this.services.AssigneTacheAProjet(form.value.nom, form.value.projet);

      this.router.navigate(['']);
    }
    else
      alert("Le nom ne peut pas être vide, la tâche n'a pas été crée.");
  }
}
