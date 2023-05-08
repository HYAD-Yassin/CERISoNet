import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'
import { MessagesService } from '../services/messages.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor( public authService : AuthService ,
    private router : Router,
    private http: HttpClient,
    private messageService: MessagesService,
    ) { }
  
 

 
  
  ngOnInit(): void {
  
    
    
  }


   // pour l'affichage du navigation
   logout() {

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');


    const json = JSON.parse('{"userid":'+localStorage.getItem("UserId")+'}');

    console.log(json);
    console.log(JSON.stringify(localStorage.getItem("UserId")));

  

    this.http.post('https://pedago.univ-avignon.fr:3199/logout', json, {
      headers: headers
    }).subscribe( (data : any) =>  {
      if(data){

        console.log("deconnexion");
        this.messageService.add("L'utilisateur "+ localStorage.getItem("Prenom")+" est déconnecté");


        localStorage.clear();
        this.router.navigate(['/login']);
      }else{
        this.messageService.add("Probléme au niveau de la déconnexion");
      }
    });

  }
  


  public get showPrenom(){
    return localStorage.getItem("Prenom");
  }  

  public get showAvatar(){
    return localStorage.getItem("avatar");
  }  

  details(){
    this.router.navigate(['/profile']);

  }

  home(){
    this.router.navigate(['/']);

  }

  addPost(){
    this.router.navigate(['/addPost']);

  }

}
