import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from '@angular/router'

import { MessagesService } from '../services/messages.service';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder : FormBuilder,
    private router : Router,
    private messageService: MessagesService,
    private authService : AuthService,

    ) {}

    ngOnInit(): void {


      this.form = this.formBuilder.group({
        username: '',
        password: ''
      });
    
    }

   
    // Envoyer les infos au Serveur et recevoir les info du l'User
    submit() : void   {

      console.log(this.form.getRawValue());
  
    
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

          this.http.post('https://pedago.univ-avignon.fr:3199/login', JSON.stringify(this.form.getRawValue()), {
            headers: headers
          }).subscribe( (data : any) =>  {
            
           console.log(data);
       
          
          if(data == 1){
          
            this.messageService.add("Le mot de passe est incorrect " );
          }else if(!data){

            this.messageService.add("Connexion échouée : informations de connexion incorrecte " );

          }else {
          this.authService.storeUser(data); }

          });
          

           
      }


      



    
    }
    

 


