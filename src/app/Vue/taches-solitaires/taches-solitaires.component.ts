import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../../Services/serviceImpl';
import { Task } from "../../Modele/Task";
import * as $ from 'jquery';

@Component({
  selector: 'app-taches-solitaires',
  templateUrl: './taches-solitaires.component.html',
  styleUrls: ['./taches-solitaires.component.scss']
})
export class TachesSolitairesComponent implements OnInit {

  TasksSolitaires: Task[]

  constructor(private services: ServiceImpl) { }

  ngOnInit(): void {
    this.services.Load();
    this.TasksSolitaires = this.services.GetAllTachesSolitaires();

    if(this.TasksSolitaires.length > 0)
      $('#tachesSolitairesVide').hide();
  }

}
