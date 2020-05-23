import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"

export class ServiceImpl {

  taches: Task[] = [
    {name: 'Aller en egypte', start: new Date(), duration: new Date(), running: false},
    {name: 'Louer un sous-marin', start: new Date(), duration: new Date(), running: false},
    {name: 'Pécho une L1 japonaise', start: new Date(), duration: new Date(), running: false},
    {name: 'Mettre sa cigarette dans le bon sens', start: new Date(), duration: new Date(), running: false}
  ];

  projets: Project[] = [
    {name: 'Abattre DIO', tasks: [this.taches[0], this.taches[1]]},
    {name: 'Faire Josuke', tasks: [this.taches[2]]},
    {name: 'Manger une salade césar', tasks: [this.taches[3]]}
  ];

  /*
    Ajoute un projet
    @param : le nom du projet (String)
  */
  AjouterProjet(nom: string) {
    this.projets.push({name: nom, tasks: []});
    console.log("Projet " + nom + "crée");
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
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Crée une tâche
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
  */
  CreeTache(nom: string) {
    this.taches.push({name: nom, start: new Date(), duration: new Date(), running: false});
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
    return this.taches;
  }

  /*
    Retourne toutes les tâches qui sont actives
    @return : un array de Task
  */
  GetAllTachesRunning(){
    return this.taches;
  }

}
