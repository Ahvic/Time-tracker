import { Injectable } from '@angular/core';
import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"


export class ServiceImpl {

  taches: Task[] = [
    {name: 'Aller en egypte', start: new Date(), duration: 0, older_run_duration:0, running: true},
    {name: 'Louer un sous-marin', start: new Date(), duration: 0, older_run_duration:0, running: true},
    {name: 'Pécho une L1 japonaise', start: new Date(), duration: 0, older_run_duration:0, running: false},
    {name: 'Mettre sa cigarette dans le bon sens', start: new Date(), duration: 0, older_run_duration:0, running: false}
  ];

  projets: Project[] = [
    {name: 'Abattre DIO', tasks: [this.taches[0], this.taches[1]]},
    {name: 'Faire Josuke', tasks: [this.taches[2]]},
    {name: 'Manger une salade césar', tasks: [this.taches[3]]}
  ];

  /*
    Ajoute un projet
    Ne fait pas de duplicat
    @param : le nom du projet (String)
    @return : fait ou non (Boolean)
  */
  CreerProjet(nom: string) {
    for (let i = 0; i < this.projets.length; i++) {
      if(this.projets[i].name == nom)
        return false;
    }

    this.projets.push({name: nom, tasks: []});
    localStorage.setItem("projects",JSON.stringify(this.projets));
    return true;
  }

  /*
    Charge les données locales
  */
  Load() {

  }

  /*
    Ajoute une tâche à un projet
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
  */
  AjouterTache(nom: string, projet: Project) {
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom){
        projet.tasks.push(this.taches[i]);
      }
    }
    localStorage.setItem("tasks",JSON.stringify(this.taches));
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Crée une tâche
    Ne fait pas de duplicat
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
  */
  CreeTache(nom: string) {
    this.taches.push({name: nom, start: new Date(), duration: 0, older_run_duration:0, running: false});
    localStorage.setItem("tasks",JSON.stringify(this.taches));
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Ajoute une tâche à un projet
    @param : le nom de la tâche (String), le projet associé (String, nullable)
  */
  AssigneTacheAProjet(nom: string, projet: string) {
    let p = this.TrouverProjet(projet);
    for (let i = 0; i < p.tasks.length; i++) {
      if(p.tasks[i].name == nom){
        console.log("déjà dans projet");
        return false;
      }
    }
    let n = this.TrouverTache(nom);
    p.tasks.push(n);
    console.log(nom + " assigné à " + projet);
  }

  /*
    Supprime une tâche
    @param : le nom de la tâche (String)
  */
  RemoveTache(nom: string) {
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom){
        delete this.taches[i];
      }
    }
    for (let i = 0; i < this.projets.length; i++) {
      for (let j = 0; j < this.projets[i].tasks.length; j++) {
        if(this.projets[i].tasks[j].name == nom){
          delete this.projets[i].tasks[j];
        }
      }
    }
    localStorage.setItem("tasks",JSON.stringify(this.taches));
    localStorage.setItem("projects",JSON.stringify(this.projets));
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Trouve une tâche en fonction de son nom
    @param : le nom a chercher (String)
    @return : un objet Task (nullable)
  */
  TrouverTache(nom: String) {
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom){
        return this.taches[i];
      }
    }
  }

  /*
    Trouve un projet qui a le nom en paramètre
    @param : le nom a chercher (String)
    @return : un objet Project (nullable)
  */
  TrouverProjet(nom: String) {
    for (let i = 0; i < this.projets.length; i++) {
      if(this.projets[i].name == nom){
        return this.projets[i];
      }
    }
  }

  /*
    Retourne tous les projets
    @return : un array de Project
  */
  GetProjets() {
    return this.projets;
  }

  /*
    Inverse la valeur running de la tâche spécifiée
    @param : le nom de la tache (String)
  */
  AllumeEteintTache(nom: String){
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom){
        if(this.taches[i].running == false){
          this.taches[i].running = true;
          this.taches[i].start = new Date();
        }else{
          this.taches[i].running = false;
          this.taches[i].older_run_duration = this.taches[i].duration;
        }
      }
    }
  }

  /*
    Change une tache et les projets auquels elle est associée
    Permet aussi de créer une tache
    @param : l'ancien nom (String), le nouveau (String), durée reset ? (Boolean), nouveau projet associé (String, pe vide)
  */
  ModifierTache(nomOriginal: string, nouvNom: string, durationReset: boolean, projet: string){
    console.log("original: " + nomOriginal + " nouvNom: " + nouvNom + " reset: " + durationReset + " projet: " + projet)
  }

  /*
    Retourne toutes les tâches qui ne sont dans aucun projet
  */
  GetAllTachesSolitaires(){
    let maliste = this.taches;
    for (let n = 0; n < this.taches.length; n++) {
      for (let i = 0; i < this.projets.length; i++) {
        for (let j = 0; j < this.projets[i].tasks.length; j++) {
          if(this.taches[n] == this.projets[i].tasks[j]){
            delete maliste[n];
          }
        }
      }
    }
    return maliste;
  }

  /*
    Retourne toutes les tâches qui sont actives
    @return : un array de Task
  */
  GetAllTachesRunning(){
    return this.taches;
  }

  /*
    Crée une tache en lancant directement le timer
    @param : nom de la tache (String)
  */
  QuickStart(nom: String){
    console.log("QuickStart " + nom + " crée");
  }

  /*
    Met à jour le timer d'une tache
    @param : nom de la tache concernée (String)
  */
  MajTimer(nom: String){
    var tache: Task = this.TrouverTache(nom);

    if(tache.running){
      var ecartMilli= new Date().getTime() - tache.start.getTime();
      tache.duration = ecartMilli + tache.older_run_duration;
    }
  }
}
