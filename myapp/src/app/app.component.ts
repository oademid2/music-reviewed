import { Component } from '@angular/core';
import { UserdataService } from './userdata.service';
import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';
  constructor(private _dataService: UserdataService, private data: DataService) { }
  message:string;
  User: Object
  ngOnInit(){
    //this.data.currentMessage.subscribe(message => this.message = message)
    this.data.currentUser.subscribe(user => {
      this.User = user
      console.log(user)
    })

  }

}
