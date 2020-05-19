import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../services/serviceImpl';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cree-projet',
  templateUrl: './cree-projet.component.html',
  styleUrls: ['./cree-projet.component.scss']
})
export class CreeProjetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
