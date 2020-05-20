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
    Ajoute une tâche
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
    this.taches.push({name: nom, start: new Date(), duration: new Date(), running: false})
    console.log("Tâche " + nom + "ajoutée");
  }

  /*
    Trouve une tâche en fonction de son nom
    @param : le nom a chercher (String)
    @return : un objet Task (nullable)
  */
  TrouverTache(nom: String) {
    console.log("Quelqu'un cherche la tâche " + nom);
    return null;
  }

  /*
    Trouve un projet qui a le nom en paramètre
    @param : le nom a chercher (String)
    @return : un objet Project (nullable)
  */
  TrouverProjet(nom: String) {
    console.log("Quelqu'un cherche la tâche " + nom);
    return this.projets[0];
  }

  /*
    Retourne tous les projets
    @return : un array de Project
  */
  GetProjets() {
    return this.projets;
  }
}
