import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Realiza tu registro';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
