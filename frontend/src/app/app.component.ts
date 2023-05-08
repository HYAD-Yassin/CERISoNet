import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {io} from 'socket.io-client'

import { MessagesService } from './services/messages.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'CERISoNet';

  constructor(
    private router : Router,
    private messageService: MessagesService,

    ) {}

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      this.router.navigate(['/login']);

    }

    const socket = io('https://pedago.univ-avignon.fr:3199');
        socket.on('notification', (data : any) => {  // réception message du server
        console.log(data);

        this.messageService.add(data.hello);
      })
  
  }

}


