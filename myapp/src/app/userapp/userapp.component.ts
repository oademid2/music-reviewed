import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-userapp',
  templateUrl: './userapp.component.html',
  styleUrls: ['./userapp.component.scss']
})
export class UserappComponent implements OnInit {

  SongsList: any;
  ContestedList: any;
  UsersList: any;
  Contest: any = {
    type: null,
    date: null,
    comment: null,
    songid: null,
  }

  contestSong: any;
  message: String;
  User: Object;
  constructor(private _http: HttpService, private data: DataService) { }

  ngOnInit() {

    this.data.currentUser.subscribe(user => {
      this.User = user
      console.log(user)
    })

    this.data.currentOptions.subscribe(opt => {
      this._http.httpOptions = opt
    })

    this._http.getUsers().subscribe(data => {
      this.UsersList = data;
      console.log(data)
    });

    this._http.getSongs().subscribe(data => {
      this.SongsList = data;
    });

    this.Contest = {
      type: null,
      date: null,
      comment: null,
      songid: null,
    }


    setInterval(() => this.refreshFromDatabase(), 700)

  
  }

  refreshFromDatabase(){

    //refresh songs....
    this._http.getSongs().subscribe(data => {
      this.SongsList = data;
      console.log(this.ContestedList)
    })

    this._http.getUsers().subscribe(data => {
      this.UsersList = data;
    });

    

    //refresh reviews....

  }

  testbtn(){
    console.log()
  }

  getUsers(){

    this._http.getUsers().subscribe(data => {
      this.UsersList = data;
    });
  }

  getSongs(){

    this._http.getSongs().subscribe(data => {
      this.SongsList = data;
    });
  }

  toggleAdminUser(id){

    let userId = id;
    let updatedUser: Object;
    this._http.getUser(id).subscribe(data=>{

      console.log(data['manager'])
      data['manager'] = !data['manager']

      console.log(data['manager'])
      updatedUser = data;
      this._http.updateUser(userId, updatedUser).subscribe(resp =>{
        console.log(resp)
      })
    })
  }

  toggleActiveUser(id){

    let userId = id;
    let updatedUser: Object;
    this._http.getUser(id).subscribe(data=>{

      data['active'] = !data['active']

      console.log(data['active'])
      updatedUser = data;
      this._http.updateUser(userId, updatedUser).subscribe(resp =>{
        console.log('resp', resp)
      })
    })
  }

  toggleHiddenSong(id){

    let songId = id;
    let updatedSong: Object;
    this._http.getSong(id).subscribe(data=>{

      data['hidden'] = !data['hidden']

      console.log(data['active'])
      updatedSong = data;
      this._http.updateSong(songId, updatedSong).subscribe(resp =>{
        console.log('resp', resp)
      })
    })
  }

  logContest(songid, song, type){
    this.Contest['songid'] = songid
    this.Contest['type'] = type
    song[type] = this.Contest
    this.contestSong = song;

    let d = document.getElementsByClassName('log-contest') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "block";

  }

  sumbitContest(){

    console.log(this.contestSong);
    this._http.updateSong(this.contestSong._id, this.contestSong).subscribe(resp => {
        console.log(resp)
    })

    let d = document.getElementsByClassName('log-contest') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
  
  }
  restoreContest(id, song){

    console.log(song)
    song['notice'] = null;
    song['request'] = null;
    song['dispute'] = null;
    this._http.updateSong(id, song).subscribe(resp => {
      console.log(resp)
  })
  }
  toggleUserProp(id, prop){

    let userId = id;
    let updatedUser: Object;
    this._http.getUser(id).subscribe(data=>{

      data[prop] = !data[prop]

      console.log(data[prop])
      updatedUser = data;
      this._http.updateUser(userId, updatedUser).subscribe(resp =>{
        console.log(resp)
      })
    })
  }

  

}
