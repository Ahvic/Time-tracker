import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"

export class ServiceImpl {

  taches: Task[] = [
  ];

  projets: Project[] = [
  ];



  /*
    Ajoute un projet
    Ne fait pas de duplicat
    @param : le nom du projet (String)
  */
  CreerProjet(nom: string) {
    this.projets.push({name: nom, tasks: []});
    localStorage.setItem("projects",JSON.stringify(this.projets));
    console.log("Projet " + nom + "crée");
    console.log("Projet " + nom + " crée");
  }

  Load() {
    this.projets = JSON.parse(localStorage.getItem("projects"));
    this.taches = JSON.parse(localStorage.getItem("tasks"));
  }

  /*
    Ajoute une tâche
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
    this.taches.push({name: nom, start: new Date(), duration: new Date(), running: false});
    localStorage.setItem("tasks",JSON.stringify(this.taches));
    console.log("Tâche " + nom + "ajoutée");
    console.log("Tâche " + nom + " crée");
  }

  /*
    Ajoute une tâche à un projet
    @param : le nom de la tâche (String), le projet associé (String, nullable)
  */
  AssigneTacheAProjet(nom: string, projet: string) {
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
        }else{
          this.taches[i].running = false;
        }
      }
    }
  }

  /*
    Change une tache et les projets auquels elle est associée
    Permet aussi de créer une tache
    @param : la tache (Task), le projet choisi pour cette tache
  */
  ModifierTache(tache: Task, projet: Project){

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
    @param : nom de la tache
  */
  QuickStart(nom: String){
    console.log("QuickStart " + nom + " crée");
  }

}
