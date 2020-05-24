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
    Affiche le contenu de taches et projets dans la console
  */
 DebugArrays(){
   var resultat = "";

   for (let i = 0; i < this.projets.length; i++) {
     resultat += this.projets[i].name + " tâches:\n";
     for (let j = 0; j < this.projets[i].tasks.length; j++)
      resultat += "   " + this.projets[i].tasks[j].name + "\n";
    resultat += "\n";
   }

   for (let i = 0; i < this.taches.length; i++) {
     resultat += this.taches[i].name + " running: " + this.taches[i].running + "\n";
   }

   console.log(resultat);
 }

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
    Trouve une tâche en fonction de son nom
    @param : le nom a chercher (String)
    @return : un objet Task (nullable)
  */
  TrouverTache(nom: String) {
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom)
        return this.taches[i];
    }

    return null;
  }

  /*
    Trouve un projet qui a le nom en paramètre
    @param : le nom a chercher (String)
    @return : un objet Project (nullable)
  */
  TrouverProjet(nom: String) {
    for (let i = 0; i < this.projets.length; i++) {
      if(this.projets[i].name == nom)
        return this.projets[i];
    }

    return null
  }

  /*
    Charge les données locales
  */
  Load() {

  }

  /*
    Crée une tâche et l'assigne a un projet si nécessaire
    Ne fait pas de duplicat
    @param : le nom de la tâche (String), le projet associé (String, nullable), si elle demarre tout de suite (Booleen)
  */
  CreeTache(nom: string, projet: string, demarre: boolean) {
    //On vérifie que la tache n'est pas déjà dans la liste
    if(this.TrouverTache(nom) == null){
      this.taches.push({name: nom, start: new Date(), duration: 0, older_run_duration:0, running: demarre});
      this.AssigneTacheAProjet(nom, projet);

      localStorage.setItem("tasks",JSON.stringify(this.taches));
      console.log("Tâche " + nom + " crée");
    }
    else{
      console.log("la tâche " + nom + " existe déjà");
    }
  }

  /*
    Crée une tache en lancant directement le timer
    @param : nom de la tache (String), le projet associé (String, nullable)
  */
  QuickStart(nom: string, projet: string){
    this.CreeTache(nom, projet, true);
  }

  /*
    Ajoute une tâche à un projet
    Une tache ne peut être que sur un projet à la fois
    @param : le nom de la tâche (String), le projet associé (String, nullable)
    @return : vrai si réussi, faux sinon
  */
  AssigneTacheAProjet(nom: string, projet: string) {
    let p = this.TrouverProjet(projet);
    let n = this.TrouverTache(nom);

    if(p != null && n != null){

      //On enlève la tache si ele est déjà dans un projet
      for (let i = 0; i < this.projets.length; i++) {
        for(let j = 0; j < this.projets[i].tasks.length; j++){
          if(this.projets[i].tasks[j].name == nom)
            this.projets[i].tasks.splice(j, 1);
        }
      }

      //On vérifie que la tache n'est pas déjà dans le projet
      for (let i = 0; i < p.tasks.length; i++) {
        if(p.tasks[i].name == nom){
          console.log(nom + " déjà dans projet " + p.name);
          return false;
        }
      }

      p.tasks.push(n);
      localStorage.setItem("projects",JSON.stringify(this.projets));
      console.log(nom + " assigné à " + projet);
      return true;
    }

    return false;
  }

  /*
    Supprime une tâche
    @param : le nom de la tâche (String)
  */
  SupprimeTache(nom: string) {
    //On retire la tache de taches
    for (let i = 0; i < this.taches.length; i++) {
      if(this.taches[i].name == nom){
        delete this.taches[i];
      }
    }

    //On l'enlève de son projet si elle en a une
    for (let i = 0; i < this.projets.length; i++) {
      for (let j = 0; j < this.projets[i].tasks.length; j++) {
        if(this.projets[i].tasks[j].name == nom){
          delete this.projets[i].tasks[j];
        }
      }
    }

    localStorage.setItem("tasks",JSON.stringify(this.taches));
    localStorage.setItem("projects",JSON.stringify(this.projets));
    console.log("Tâche " + nom + " supprimée");
  }

  /*
    Retourne tous les projets
    @return : un array de Project
  */
  GetProjets() {
    return this.projets;
  }

  /*
    Inverse la valeur running de la tâche spécifiée et fait des opérations liées au chrono
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
