import { Task } from "../Modele/Task";
import { Project } from "../Modele/Project"

export class ServiceImpl{

  taches: Task[] = [
    {name: 'Aller en egypte', start: new Date(), duration: new Date(), running: true},
    {name: 'Louer un sous-marin', start: new Date(), duration: new Date(), running: true},
    {name: 'Pécho une L1 japonaise', start: new Date(), duration: new Date(), running: true},
    {name: 'Mettre sa cigarette dans le bon sens', start: new Date(), duration: new Date(), running: true}
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
    Trouve un projet qui a le nom en paramètre
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

  /*
    Met à jour les durées des tâches qui tournent
    Je sais pas comment l'appeler toutes les secondes
  */
  MajDureeTaches(){

  }

  /*
    Allume ou éteint une tâche
    @param : le nom de la tâche (String)
  */
  allumeEteintTache(nom: String){

  }

  /*
    
  */
}
