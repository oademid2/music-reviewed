import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { UserdataService } from '../userdata.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  _policy: Object;
  _policydoc: String;
  _downpolicy: Object;
  _downpolicydoc: String;
  User: any;
  constructor(private _http: HttpService, private _dataService: UserdataService, private _data: DataService) { }

  ngOnInit() {
    this._data.currentUser.subscribe(user => {
      this.User = user
      console.log(user)
    })

    this._data.currentOptions.subscribe(opt => {
      this._http.httpOptions = opt
    })

    console.log("init")
    console.log(this.User)
    this._http.getPolicy().subscribe( result => {
      this._policy = result;
      this._policydoc = result['policydoc']
      console.log(result)
    })

    this._http.getDownPolicy().subscribe( result => {
      this._downpolicy = result;
      this._downpolicydoc = result['policydoc']
      console.log(result)
    })

  
  }

  refreshDB(){
    this._http.getPolicy().subscribe( result => {
      //this._policy = result;
      this._policydoc = result['policydoc']
      console.log(result)
    })

    this._http.getDownPolicy().subscribe( result => {
      //this._downpolicy = result;
      this._downpolicydoc = result['policydoc']
      console.log(result)
    })

  }

  modifyPolicy(){
    let d = document.getElementsByClassName('policy-edit-area') as HTMLCollectionOf<HTMLElement>;
    let b = document.getElementsByClassName('policy-update-btn') as HTMLCollectionOf<HTMLElement>;
    let c = document.getElementsByClassName('modify-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "block";
    d[0].style.display = "block";
    c[0].style.display = "none";
  }

  updatePolicy(){
    let d = document.getElementsByClassName('policy-edit-area') as HTMLCollectionOf<HTMLElement>;
    let b = document.getElementsByClassName('policy-update-btn') as HTMLCollectionOf<HTMLElement>;
    let c = document.getElementsByClassName('modify-btn') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
    b[0].style.display = "none";
    c[0].style.display = "block";

    this._policy["policydoc"] = this._policydoc;
    this._policy["exists"] = true;
    console.log(this._policy)
    this._http.updatePolicy(this._policy['_id'], this._policy).subscribe(resp => {
        console.log(resp)
        
    })

  }
  createPolicy(){
    let d = document.getElementsByClassName('policy-create-area') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "block";

    let b = document.getElementsByClassName('policy-create-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "none";

    let c = document.getElementsByClassName('policy-save-btn') as HTMLCollectionOf<HTMLElement>;
    c[0].style.display = "block";

    let e = document.getElementsByClassName('policy-close-btn') as HTMLCollectionOf<HTMLElement>;
    e[0].style.display = "block";
  }

  savePolicy(){

    let d = document.getElementsByClassName('policy-create-area') as HTMLCollectionOf<HTMLElement>;
    let b = document.getElementsByClassName('policy-save-btn') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
    b[0].style.display = "none";

    this._policy["policydoc"] = this._policydoc;
    this._policy["exists"] = true;
    console.log(this._policy)
    this._http.updatePolicy(this._policy['_id'], this._policy).subscribe(resp => {
        console.log(resp)
        
    })

  }
  closePolicyCreate(){
    let d = document.getElementsByClassName('policy-create-area') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";

    let c = document.getElementsByClassName('policy-save-btn') as HTMLCollectionOf<HTMLElement>;
    c[0].style.display = "none";

    let e = document.getElementsByClassName('policy-close-btn') as HTMLCollectionOf<HTMLElement>;
    e[0].style.display = "none";

    let b = document.getElementsByClassName('policy-create-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "block";

    this._policy['policydoc'] = ''
  }

  //////////////////
  ////FUNCTIONS FOR TAKEDOWN POLICY////
  /////////////////////
  modifyDownPolicy(){

    let d = document.getElementsByClassName('dpolicy-edit-area') as HTMLCollectionOf<HTMLElement>;
    let b = document.getElementsByClassName('dpolicy-update-btn') as HTMLCollectionOf<HTMLElement>;
    let c = document.getElementsByClassName('dmodify-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "block";
    d[0].style.display = "block";
    c[0].style.display = "none";
  }

  updateDownPolicy(){
 
    let d = document.getElementsByClassName('dpolicy-edit-area') as HTMLCollectionOf<HTMLElement>;
    let b = document.getElementsByClassName('dpolicy-update-btn') as HTMLCollectionOf<HTMLElement>;
    let c = document.getElementsByClassName('dmodify-btn') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
    b[0].style.display = "none";
    c[0].style.display = "block";

    this._downpolicy["policydoc"] = this._downpolicydoc;
    this._downpolicy["exists"] = true;
    console.log(this._downpolicy)
    this._http.updatePolicy(this._downpolicy['_id'], this._downpolicy).subscribe(resp => {
        console.log(resp)
        
    })

    

  }


  createDownPolicy(){
    let d = document.getElementsByClassName('dpolicy-create-area') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "block";

    let b = document.getElementsByClassName('dpolicy-create-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "none";

    let c = document.getElementsByClassName('dpolicy-save-btn') as HTMLCollectionOf<HTMLElement>;
    c[0].style.display = "block";

    let e = document.getElementsByClassName('dpolicy-close-btn') as HTMLCollectionOf<HTMLElement>;
    e[0].style.display = "block";

    
  }

  saveDownPolicy(){
    let d = document.getElementsByClassName('dpolicy-create-area') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
    let b = document.getElementsByClassName('dpolicy-save-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "none";
    this._downpolicy["policydoc"] = this._downpolicydoc;
    this._downpolicy["exists"] = true;
    console.log(this._downpolicy)
    this._http.updateDownPolicy(this._downpolicy['_id'], this._downpolicy).subscribe(resp => {
        console.log(resp)
        //this._downpolicy = resp;
        //this.refreshDB()
    })

    

  }
  closeDownPolicyCreate(){
    let d = document.getElementsByClassName('dpolicy-create-area') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";

    let c = document.getElementsByClassName('dpolicy-save-btn') as HTMLCollectionOf<HTMLElement>;
    c[0].style.display = "none";

    let e = document.getElementsByClassName('dpolicy-close-btn') as HTMLCollectionOf<HTMLElement>;
    e[0].style.display = "none";

    let b = document.getElementsByClassName('dpolicy-create-btn') as HTMLCollectionOf<HTMLElement>;
    b[0].style.display = "block";

    this._downpolicy['policydoc'] = ''
  }
}
