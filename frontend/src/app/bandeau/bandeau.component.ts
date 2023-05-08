import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';




@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.scss']
})
export class BandeauComponent implements OnInit {

  constructor(public messageService: MessagesService) { }

  ngOnInit(): void {
  }

 


}
