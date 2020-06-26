import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public token;
  public status;
  public identity;
  public url;
  public afuConfig;

  constructor(private _userService: UserService) {
    this.page_title = 'Edición de tus datos';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png, .jpeg, .gif',
      maxSize: '10',
      uploadAPI: {
        url: this.url + 'uploadAvatar',
        headers: {
          Authorization: this.token,
        },
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
    };
  }

  avatarUpload(data) {
    let data_obj = JSON.parse(data.response);
    console.log(data_obj);

    this.user.image = data_obj.user.image;
    console.log(this.user);
  }
  ngOnInit(): void {}

  onSubmit(form) {}
}
