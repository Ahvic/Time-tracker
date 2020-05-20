import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"

export class ServiceImpl{

  projets: Project[] = [
    {name: 'Abattre DIO', tasks: null},
    {name: 'Faire Josuke', tasks: null},
    {name: 'Manger une salade césar', tasks: null}
  ];

  taches = [];

  /*
    Ajoute un projet
    @param : le nom du projet (String)
  */
  AjouterProjet(nom: string){
    console.log("Quelqu'un essaie de créer un projet nommé " + nom);
  }

  /*
    Ajoute une tâche
    @param : le nom de la tâche (String), le projet associé (Project, nullable)
  */
  AjouterTache(nom: string, projet: Project){
    console.log("Quelqu'un essaie de créer une tâche nommé " + nom);
  }

  /*
    Trouve une tâche en fonction de son nom
    @param : le nom a chercher (String)
    @return : un objet Task (nullable)
  */
  TrouverTache(nom: String){
    console.log("Quelqu'un cherche la tâche " + nom);
    return null;
  }

  /*
    Trouve un projet en fonction de son nom
    @param : le nom a chercher (String)
    @return : un objet Project (nullable)
  */
  TrouverProjet(nom: String){
    console.log("Quelqu'un cherche la tâche " + nom);
    return this.projets[0];
  }

  /*
    Retourne tous les projets
    @return : un array de Project
  */
  GetProjets(){
    return this.projets;
  }
}
