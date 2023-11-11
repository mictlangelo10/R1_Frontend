import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  listUsers: User[] = [
    {id: 1, nombre: 'Emmanuel', ApellidoP: 'Gutiérrez', ApellidoM: 'Díaz'},
    {id: 2, nombre: 'Miguel', ApellidoP: 'Hernandez', ApellidoM: 'Solis'},

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
