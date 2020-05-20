import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceImpl } from '../services/serviceImpl';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cree-projet',
  templateUrl: './cree-projet.component.html',
  styleUrls: ['./cree-projet.component.scss']
})
export class CreeProjetComponent implements OnInit {

  constructor(private services: ServiceImpl,
              private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.services.AjouterProjet(form.value.name);

    //On renvoi l'utilisateur sur le menu principal
    this.router.navigate([''])
  }
}
