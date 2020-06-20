import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title = "Realiza tu registro"
  }

  ngOnInit(): void {
  }

}
