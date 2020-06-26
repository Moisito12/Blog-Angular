import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { identity } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Página de login';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    // conseguir el objeto completo del usuario logueado
    this._userService.signin(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          // Guardamos el usuario en una propiedad
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario indentificado
          this._userService.signin(this.user, true).subscribe(
            (response) => {
              if (response.token) {
                // Guardamos el token en una propiedad
                this.token = response.token;
                localStorage.setItem('token', this.token);

                this.status = 'success';
                this._router.navigate(['']);
              } else {
                this.status = 'error';
              }
            },
            (error) => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
}
