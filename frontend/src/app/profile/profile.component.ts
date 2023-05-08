import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  
  myposts :any = [];
  mycomments :any = [];

  nbrposts : any;
  nbrcomments : any; 


  constructor(
    private router : Router,
  ) { }

  ngOnInit(): void {
  this.getmyposts();
  }
  


  public get showPrenom(){
    return localStorage.getItem("Prenom");
  }  
  public get showNom(){
    return localStorage.getItem("Nom");
  } 

  public get showAvatar(){
    return localStorage.getItem("avatar");
  } 

  public get showUsername(){
    return localStorage.getItem("Username");
  } 

  public get showlastDateconnection(){
    return localStorage.getItem("lastDateconnection");
  } 

  public get statut(){
    
    if(localStorage.getItem("statut_connexion") == "1" ){
      const stat = "Online"   
      return stat;
    }else{

      const stat = "Offline"  
      return stat;
    }
    
  } 
// pour Récuperer mes post et mes commentaires
  getmyposts(){
    let a = localStorage.getItem("Posts")!;
    let posts = JSON.parse(a);

    console.log(posts);

    let mycomment : any = [];
    let mypost : any = [];

    var myid = localStorage.getItem("UserId");


          posts.forEach( (post: any) => {
           
              
              if(post.createdBy == myid){
               
                mypost.push(post);
              }

              post.comments.forEach( (comment: any) => {
                // Ajouter l'id et le body du post au commentaire pour le profile 
                if(comment.commentedBy == myid){
                  comment.idpost = post._id;
                  comment.bodypost = post.body;
                  mycomment.push(comment);

                }
            });


        });

      

     this.mycomments = mycomment;

     console.log(this.mycomments);

     this.myposts = mypost;


     // pour les nombres des posts et commentaires

     this.nbrcomments = this.mycomments.length;
     this.nbrposts = this.myposts.length;




  }

 




}
