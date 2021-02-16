import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';


//https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  private userSource = new BehaviorSubject(Object({
    email: null,
    password: null,
    active: true,
    manager: false
  }));
  currentMessage = this.messageSource.asObservable();
  currentUser = this.userSource.asObservable();

  loggedSource = new BehaviorSubject(false);
  currentLogged = this.loggedSource.asObservable();

  ismanagerSource = new BehaviorSubject(false);
  currentIsmanager = this.ismanagerSource.asObservable();

  httpSource = new BehaviorSubject(new HttpService(null));
  currentHttp = this.ismanagerSource.asObservable();
  
  optionsSource = new BehaviorSubject({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': ''
    })
  })

  currentOptions = this.optionsSource.asObservable();

  constructor(http: HttpService) { }

  ngOnInit(){

  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  changeUser(user: Object) {
    this.userSource.next(user)
    console.log('DS user', user)
  }

  changeLogged(logged: boolean) {
    this.loggedSource.next(logged)
    console.log('DS user', logged)
  }

  changeIsmanager(is: boolean) {
    this.ismanagerSource.next(is)
    console.log('DS user', is)
  }

  changeOptions(opt){
      this.optionsSource = opt;
  }

}