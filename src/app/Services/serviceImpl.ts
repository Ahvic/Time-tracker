import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"

export class ServiceImpl {

  taches: Task[] = [
  ];

  projets: Project[] = [
  ];

  /*
    Ajoute un projet
    @param : le nom du projet (String)
  */
  AjouterProjet(nom: string) {
    this.projets.push({name: nom, tasks: []});
    localStorage.setItem("projects",JSON.stringify(this.projets));
    console.log("Projet " + nom + "crée");
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
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
  */
  CreeTache(nom: string) {
    this.taches.push({name: nom, start: new Date(), duration: new Date(), running: false});
    localStorage.setItem("tasks",JSON.stringify(this.taches));
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Remove une tâche
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
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
}
