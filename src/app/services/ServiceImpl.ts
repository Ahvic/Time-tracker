import { Task } from "../models/Task";
import { Project } from "../models/Project"

export class ServiceImpl{

  projet = ["initial"];

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
}
