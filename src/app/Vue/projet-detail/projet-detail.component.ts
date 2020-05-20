import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Project } from "../../Modele/Project"

@Component({
  selector: 'app-projet-detail',
  templateUrl: './projet-detail.component.html',
  styleUrls: ['./projet-detail.component.scss']
})
export class ProjetDetailComponent implements OnInit {

  projet: Project;

  constructor(private services: ServiceImpl,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    var nomProjet = this.route.snapshot.paramMap.get('nom');
    this.projet = this.services.TrouverProjet(nomProjet);
  }

  nouvTache(){
    //Ouvre la page pour modifier une tâche
    this.router.navigate(['/creerTache', '', this.projet.name]);
  }
}
