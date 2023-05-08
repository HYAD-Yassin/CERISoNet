import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm  } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { MessagesService } from '../services/messages.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  AllTheData : any ;
  comments = false;
  p:number = 1;
    
  constructor(
    private router : Router,
    private http: HttpClient,
    private messageService: MessagesService,




  ) { }

  ngOnInit(): void {
   
  

  this.getallData();


  }

      // Envoyer le post id + le text + user id

      comment(form : NgForm) : void {
        

      const userid = localStorage.getItem("UserId");

      form.value.userid = localStorage.getItem("UserId");

      console.log(form.value);
        
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

          this.http.post('https://pedago.univ-avignon.fr:3199/comment', form.value , {
            headers: headers
          }).subscribe( (data : any) =>  {
          

          });
          this.ngOnInit();


          this.messageService.add("Commentaire Ajouté Avec Succées");


      }

      // Envoyer le post id + les nombres de likes
      like(likeform : NgForm) : void {
        
        console.log(likeform.value);

        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
  
            this.http.post('https://pedago.univ-avignon.fr:3199/like', likeform.value , {
              headers: headers
            }).subscribe( (data : any) =>  {
          
            });
            this.ngOnInit();

            this.messageService.add("Like Ajouté Avec Succées");


            

      }




      // afficher les commentaires
      allComments(){
        if(this.comments){
        this.comments = false;
      }else{
        this.comments = true;
      }
      }
  
    
  

      // Créer un Json avec tout les données
  getallData() {

  
    let Posts: any , Users : any;

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

 

      // Get Posts and Users
        this.http.post('https://pedago.univ-avignon.fr:3199/getPosts' , {headers}).subscribe( (data : any) =>  {
           Posts = data;
           


                this.http.post('https://pedago.univ-avignon.fr:3199/getUsers', {headers} ).subscribe( (data : any) =>  {
                  
                  Users = data;

                  

                  // Ajouter les Informations des Users au Posts
                  Posts.forEach( (post : any , jindex : any) => { 
                    post.creator = {}; 
                    post.creator = {id : -1 ,identifiant : "" , avatar : "" , statut_connexion : 0 }

                   
            

                    
                    Users.forEach( (user : any) => { 

                            // Ajoute des Creator des Posts
                            if(post.createdBy == user.id){
                             
                              post.creator = {id : user.id ,identifiant : user.identifiant , avatar : user.avatar , statut_connexion : user.statut_connexion }
                               
                            // Si User n'existe pas
                            }else if(post.creator.id == -1) {
    
                              post.creator = {id : post.createdBy ,identifiant : "Utilisateur Supprimé" , avatar : "https://gp1.wac.edgecastcdn.net/802892/http_public_production/artists/images/4915681/original/crop:x0y0w1280h960/hash:1467658571/1436442720_LOGO.jpg?1467658571" , statut_connexion : 0 }

                            }
                              
                            
                              // Ajoute des Commentaires des Posts
                              if (post.comments){
                                

                                post.comments.forEach( function ( comment :any, index :any) {

                                  if(comment.text && comment.commentedBy){

                                
                                  
                                      if(comment.commentedBy == user.id){

                                        comment.commentedByUsername = user.identifiant ;
                                        comment.commentedByAvatar = user.avatar;
                                        comment.statut_connexion = user.statut_connexion;
                                        // Si User n'existe pas
                                      }else if(!comment.commentedByUsername){

                                        comment.commentedByUsername = "Utilisateur Supprimé" ;
                                        comment.commentedByAvatar =  "https://gp1.wac.edgecastcdn.net/802892/http_public_production/artists/images/4915681/original/crop:x0y0w1280h960/hash:1467658571/1436442720_LOGO.jpg?1467658571";
                                        comment.statut_connexion = 0;
                                      }

                        
                                    }else{
                                      post.comments.splice( index , 1 );
                                    }

                                })

                                

                              

                              }

                          })


                          if (!post.images){

                            Posts.splice( jindex  );

                          }
                         
                          
                         
                   
                  })
                
                  
                  
                  this.AllTheData = Posts;

                


                  
                  localStorage.setItem("Posts" , JSON.stringify(Posts));

                  console.log(Posts);
                  

  
                });
  

        });
      
  }

  sort(sortform : NgForm) : void{

  
    console.log(sortform.value);

    if(sortform.value.sortoptions == 2){
        this.AllTheData.sort((posta :any , postb : any )=>{
          this.p = 1;
          return postb.likes - posta.likes;
        })
    }

    if(sortform.value.sortoptions == 1){
      this.AllTheData.sort((posta :any , postb : any )=>{
        let datea = Date.parse(posta.date+" "+posta.hour+" GMT");
        let dateb = Date.parse(postb.date+" "+postb.hour+" GMT");
        this.p = 1;
        return dateb - datea ;
      })
  }

  if(sortform.value.sortoptions == 3){
  
    this.AllTheData.sort((posta : any, postb : any ) => 
      
      posta.creator.identifiant.localeCompare(postb.creator.identifiant));

      this.p = 1;
    

}

  }

    //filter les posts
    Filtrer(Filterform : NgForm) {

      // filter par hashtag
      if(Array.from(Filterform.value.filter)[0] == "#"){

        this.AllTheData = this.AllTheData.filter(function(post : any){
          
          
          return post.hashtags.includes(Filterform.value.filter);

      })
      this.messageService.add("Filtrage par "+ Filterform.value.filter) 
            this.p =1;


      }else{ // filter par identifiant
      
     this.AllTheData = this.AllTheData.filter(function(post : any){
          
        return post.creator.identifiant == Filterform.value.filter; 
    })
    this.messageService.add("Filtrage par l'identifiant "+ Filterform.value.filter)
    this.p =1;
  }
  }

 
  
  
 

 



}
