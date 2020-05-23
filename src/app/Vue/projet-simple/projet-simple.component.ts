import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../Modele/Project"

@Component({
  selector: 'app-projet-simple',
  templateUrl: './projet-simple.component.html',
  styleUrls: ['./projet-simple.component.scss']
})
export class ProjetSimpleComponent implements OnInit {

  @Input() nomProjet: string;

  constructor() { }

  ngOnInit(): void {
  }
}
