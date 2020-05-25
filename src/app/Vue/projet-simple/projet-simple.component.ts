import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../Modele/Project"
import { ServiceImpl } from '../../Services/serviceImpl';

@Component({
  selector: 'app-projet-simple',
  templateUrl: './projet-simple.component.html',
  styleUrls: ['./projet-simple.component.scss']
})
export class ProjetSimpleComponent implements OnInit {

  @Input() projet: Project;

  constructor(private services: ServiceImpl) { }

  ngOnInit(): void {
  }

  onDelete(){
    if(confirm("Voulez vous vraiment détruire le projet " + this.projet.name + " ?")){
      this.services.SupprimerProjet(this.projet.name);
      location.reload();
    }
  }
}
