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

  //jQuery

  constructor(private services: ServiceImpl,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    $('button').click(function(){
      alert('Wass up!');
    });

    this.nomTache = this.route.snapshot.paramMap.get('nom');
    this.nomProjet = this.route.snapshot.paramMap.get('projet');
    this.projets = this.services.GetProjets();

    if(this.nomTache != "empty"){
      this.tache = this.services.TrouverTache(this.nomTache);
    }
    else{
      this.tache = new Task();
    }
  }

  onSubmit(form: NgForm){

  }

  onSelect(projet: Project){
    console.log("On a choisi " + projet.name);

    //Ouvre la page de detail
    //this.router.navigate(['/detailProjet', projet.name]);
  }
}
