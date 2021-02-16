import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  mainUrl : String = "http://localhost:1234";
  headers: HttpHeaders = new HttpHeaders();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) { }

  setHeaders(a, b){
   this.httpOptions.headers = this.httpOptions.headers.set(a, b);
    
  }

  getOptions(){
    return this.httpOptions
  }
  getItem() {
      return this.http.get(this.mainUrl+'/api/open/song')
  }
  getSongs(){
    return this.http.get(this.mainUrl+'/api/open/songs')
  }

  login(data){
    return this.http.post(this.mainUrl+'/api/open/login', data)
  }

  google_login(data){
    return this.http.post(this.mainUrl+'/api/open/googlelogin', data)
  }
  //run it w/o = fail
  //run it with 

  createSong(data) {
    console.log(this.httpOptions.headers)
    return this.http.post(this.mainUrl+'/api/admin/create', data, this.httpOptions)
  }

  createReview(rev){
    return this.http.post(this.mainUrl+'/api/user/addreview', rev, this.httpOptions)
  }

  updateSong(id, song){
    return this.http.put(this.mainUrl+'/api/user/update/'+id, song, this.httpOptions)
  }

  getSong(id){
    return this.http.get(this.mainUrl+'/api/open/getsong/'+id)
  }

  getReviews(){
    return this.http.get(this.mainUrl+'/api/open/reviews')
  }

  getUsers(){
    return this.http.get(this.mainUrl+'/api/admin/users')
  }

  getUser(id){
    return this.http.get(this.mainUrl+'/api/admin/user/'+id)
  }

  updateUser(id, usr){
    return this.http.put(this.mainUrl+'/api/admin/userupdate/'+id, usr , this.httpOptions)
  }


  getReview(id){
    return this.http.get(this.mainUrl+'/api/open/getreview/'+id)
  }

  register(user){
    return this.http.post(this.mainUrl+'/api/open/signup', user)
  }

  getPolicy(){
    return this.http.get(this.mainUrl+'/api/open/policy')
  }

  updatePolicy(id, plc){
    return this.http.put(this.mainUrl+'/api/admin/updatepolicy/'+id, plc, this.httpOptions)
  }

  getDownPolicy(){
    return this.http.get(this.mainUrl+'/api/open/downpolicy')
  }

  updateDownPolicy(id, plc){
    return this.http.put(this.mainUrl+'/api/admin/updatedownpolicy/'+id, plc, this.httpOptions)
  }

  resend(id){
    return this.http.get(this.mainUrl+'/api/reverify/'+id)
  }

}



