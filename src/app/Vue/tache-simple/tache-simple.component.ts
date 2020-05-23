import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Task } from "../../Modele/Task";
import { Project } from "../../Modele/Project";

@Component({
  selector: 'app-tache-simple',
  templateUrl: './tache-simple.component.html',
  styleUrls: ['./tache-simple.component.scss']
})
export class TacheSimpleComponent implements OnInit {

  @Input() tache: Task;

  constructor(private services: ServiceImpl,
              private router: Router) { }

  ngOnInit(): void {

  }

  onAllumerEtendre(){
    this.services.AllumeEteintTache(this.tache.name);
  }

  onModify(){
    //Ouvre la page pour modifier une tâche
  }
}
