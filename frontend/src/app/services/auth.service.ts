import { Injectable } from '@angular/core';

import {Router} from '@angular/router'

import { MessagesService } from '../services/messages.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(   private http: HttpClient,
    private router : Router,
    private messageService: MessagesService,
   ) { }




// stocker les info dans local 
      storeUser(data: any) {
       
        

        localStorage.setItem("token", data.sessionID);


        localStorage.setItem("UserId", data.id);
        localStorage.setItem("Username", data.identifiant);
        localStorage.setItem("Prenom", data.prenom);
        localStorage.setItem("Nom", data.nom);
        localStorage.setItem("lastDateconnection", data.lastDateconnection);
        localStorage.setItem("avatar", data.avatar);

        localStorage.setItem("statut_connexion", data.statut_connexion);

      


        console.log("Data Stored in local Storage");
      

        this.messageService.add("Bonjour "+ data.prenom+ "  " + data.nom + ". Derniere Connexion " + data.lastDateconnection );
        this.router.navigate(['/']);

     
        
      }


      // pour l'affichage du navigation
      loggedin(){
  
        return localStorage.getItem("token");
  
    }

 

    

   


    
      



}


