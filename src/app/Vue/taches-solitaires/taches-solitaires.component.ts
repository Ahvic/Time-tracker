import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Task } from "../../Modele/Task";

@Component({
  selector: 'app-taches-solitaires',
  templateUrl: './taches-solitaires.component.html',
  styleUrls: ['./taches-solitaires.component.scss']
})
export class TachesSolitairesComponent implements OnInit {

  TasksSolitaires: Task[]

  constructor(private services: ServiceImpl) { }

  ngOnInit(): void {
    this.TasksSolitaires = this.services.GetAllTachesSolitaires();
  }

}
