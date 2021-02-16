import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  items = []
  User:any
  isManager: Boolean;

  constructor(private _http: HttpService) { }
  ngOninit(){
    this.User = {
      email: '',
      password: '',
      active: false,
      manager: false,
    };
    
  }

  setUsers(u){
    this.User = u;
    this.isManager = this.User.manager;
  }

  getUser(){
      return this.User
  }


}
