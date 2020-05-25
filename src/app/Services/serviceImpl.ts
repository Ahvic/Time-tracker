import { Injectable } from '@angular/core';
import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"
import { ProjectDTO } from "../Modele/ProjectDTO"


export class ServiceImpl {

  taches: Task[] = [];

  projets: Project[] = [];

  initialize: boolean = false;

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
     resultat += this.taches[i].name + " running: " + this.taches[i].running + " durée: " + this.taches[i].duration + " old duration: " + this.taches[i].older_run_duration + "\n";
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
    this.Sauvegarde();

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
    Charge les données locales au démarrage
  */
  Load() {

    //localStorage.clear();

    if(!this.initialize){
      var projets_lu = JSON.parse(localStorage.getItem("projects"));
      var taches_lu = JSON.parse(localStorage.getItem("tasks"));
      this.initialize = true;

      if(projets_lu == null)
        projets_lu = [];

      if(taches_lu == null)
        taches_lu = [];

      //console.log("projets lus: \n" + projets_lu);
      //console.log("taches lus: \n" + taches_lu);

      this.taches = taches_lu;
      this.projets = projets_lu;


      this.taches = [
        {name: 'Aller en egypte', start: new Date(), duration: 0, older_run_duration:0, running: true},
        {name: 'Louer un sous-marin', start: new Date(), duration: 0, older_run_duration:0, running: true},
        {name: 'Pécho une L1 japonaise', start: new Date(), duration: 0, older_run_duration:0, running: false},
        {name: 'Mettre sa cigarette dans le bon sens', start: new Date(), duration: 0, older_run_duration:0, running: false}
      ];

      this.projets = [
        {name: 'Abattre DIO', tasks: [this.taches[0], this.taches[1]]},
        {name: 'Faire Josuke', tasks: [this.taches[2]]},
        {name: 'Manger une salade césar', tasks: [this.taches[3]]}
      ];

      console.log("Changement des données locales terminé");
    }
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

      this.Sauvegarde();
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
    @param : le nom de la tâche (String), le projet auquel l'associé (String)
    @return : vrai si réussi, faux sinon
  */
  AssigneTacheAProjet(nom: string, projet: string) {
    let p = this.TrouverProjet(projet);
    let n = this.TrouverTache(nom);

    console.log("Assignation: " + projet);

    if(projet == "null"){
      //On enlève la tache du projet ou elle est
      for (let i = 0; i < this.projets.length; i++) {
        for(let j = 0; j < this.projets[i].tasks.length; j++){
          if(this.projets[i].tasks[j].name == nom)
            this.projets[i].tasks.splice(j, 1);
        }
      }

      return true;
    }

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
      this.Sauvegarde();
      console.log(nom + " assigné à " + projet);
      return true;
    }

    DebugArrays();

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

    this.Sauvegarde();
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

    this.Sauvegarde();
  }

  /*
    Modofie une tache et le projet auquel elle est associée
    @param : l'ancien nom (String), le nouveau (String), nouveau projet associé (String, pe vide)
  */
  ModifierTache(nomOriginal: string, nouvNom: string, projet: string){
    this.DebugArrays();

    let tache = this.TrouverTache(nomOriginal);
    tache.name = nouvNom;
    this.Sauvegarde();
    this.AssigneTacheAProjet(nouvNom, projet);

    this.DebugArrays();
  }

  /*
    Retourne toutes les tâches qui ne sont dans aucun projet
    @return : l'array concerné (Task[])
  */
  GetAllTachesSolitaires(){
    var resultat = this.taches.slice();

    //On regarde pour chaque projet si la tache apparait
    for (let i = 0; i < this.projets.length; i++) {
      for (let j = 0; j < this.projets[i].tasks.length; j++) {
        for (let k = 0; k < resultat.length; k++){
          if(this.projets[i].tasks[j].name == resultat[k].name)
            resultat.splice(k, 1);
        }
      }
    }

    return resultat;
  }

  /*
    Retourne toutes les tâches qui sont actives
    @return : l'array concerné (Task[])
  */
  GetAllTachesRunning(){
    var resultat = [];

    for (let i = 0; i < this.taches.length; i++){
      if(this.taches[i].running)
        resultat.push(this.taches[i]);
    }

    return resultat;
  }

  /*
    Met à jour le timer d'une tache
    @param : nom de la tache concernée (String)
  */
  MajTimer(nom: String){
    var tache: Task = this.TrouverTache(nom);

    if(tache != null && tache.running){
      var ecartMilli= new Date().getTime() - new Date(tache.start).getTime();
      tache.duration = ecartMilli + tache.older_run_duration;
    }

    this.Sauvegarde();
  }

  /*
    Remet à zéro le timer d'une tache
    @param : nom de la tache concernée (String)
  */
  ResetDurationTache(nom: String){
    var tache: Task = this.TrouverTache(nom);
    tache.start = new Date();
    tache.duration = 0;
    tache.older_run_duration = 0;
    this.Sauvegarde();
  }

  /*
    Sauvegarde les données de taches et projects sur le stockage local
  */
  Sauvegarde(){
    /*
    localStorage.setItem("tasks",JSON.stringify(this.taches));

    //conversion projets vers projetsDTO
    var projetsDTO: ProjectDTO[] = [];

    for (let i = 0; i < this.projets.length; i++) {
        var projetDTO: ProjectDTO = {name: this.projets[i].name, index_tasks: []};

        //On convertie les tâches en index stockable
        for(let j = 0; j < this.projets[i].tasks.length; j++){
          for(let k = 0; k < this.taches.length; k++){
            if(this.projets[i].tasks[j].name == this.taches[k].name)
              projetDTO.index_tasks.push(k);
          }
        }

        projetsDTO.push(projetDTO);
    }

    console.log(JSON.stringify(projetsDTO));
    localStorage.setItem("projects",JSON.stringify(projetsDTO));
    */
  }
}
