import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import { HttpService } from '../http.service';
import { UserdataService } from '../userdata.service';
import { stringify } from 'querystring';
import { DataService } from "../data.service";



//import { type } from 'os';
import { TouchSequence } from 'selenium-webdriver';
import FuzzySearch from 'fuzzy-search';
import * as fuzz from 'fuzzball';
import * as comp from 'string-similarity';

//ADD 
import { getAuthServiceConfigs } from '../socialloginConfig';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  ////Varaibles for tracking user status
  loggedin: boolean = false;
  User: Object = {
    email: '',
    password: '',
    active: Boolean,
    manager: Boolean,

  };
  email: string;
  password: String;

  //VARAIBLES FOR SUMBITING NEW INFORMATION
  reviewComment: string;
  reviewTitle: string;
  NewSong: Object = {
    title: null,
    album: "",
    artist: null,
    reviews: 0,
    hidden: false,
    lastreview: null,
    genre: "",
    track: 0,
    year: null
  }
  NewReview: Object = {
    title: '',
    email: '',
    review: '',
    songid: '',
    stars: null
  }

  NewUser: Object = {
    email: null,
    password: null,
    active: true,
    manager: false
  }

  //VARAIBLES FOR HOLDING DATABASE INFO
  topSongs: any;
  SongsList: any;
  viewSong: any;
  viewSongLastRev:any;
  ReviewsList: any;
  SearchList: any;
  searchTerm: string;
 

// Get the <span> element that closes the modal
span: HTMLElement = document.getElementsByClassName("close")[0] as HTMLElement;


  constructor(private _http: HttpService, private socialAuthService: AuthService, private data: DataService) { }

  ngOnInit() {

    //get all the needed items from the database...
    this.refreshFromDatabase()

    //updated shared user info
    this.data.currentUser.subscribe(user => {
      this.User = user
      console.log(user)
    })

    this.data.currentLogged.subscribe(logged => {
      this.loggedin = logged
      console.log("User loggedin? ", logged)
    })
    //continuously update....
    setInterval(() => this.refreshFromDatabase(), 1500)

  }


//https://codinglatte.com/posts/angular/sign-in-with-google-angular/
  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    let local_token;
    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
      local_token = userData.idToken
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server
       console.log(userData.email);
       this.NewUser['email'] = userData.email
       this._http.google_login({email: userData.email, token: userData.idToken}).subscribe(data =>{
        console.log('daataaa',data)


        //If auth failed....
        if(data['message'] == "Auth failed") return alert("Not valid login")
  
        //If the user is not active....
        else if(data['user']['active'] == "no"){
            alert("Account is deactivated. Please contact Admin.");
            return;
          }
  
          //otherwise allow them to login....and update data...
          this.loggedin = true;
          console.log('Logged in: ', data['token'])
          this._http.httpOptions.headers = this._http.httpOptions.headers.set('Authorization', 'Bearer ' + data['token']);
          this._http.setHeaders('Authorization', 'Bearer ' + data['token'])
          this.data.changeUser(data['user'])
          this.data.changeLogged(true)
          console.log("goog sign ", data)
          this.User = data['user'][0];
          console.log( data['user'][0])
      

       })
    });
 }


  refreshFromDatabase(){

    //refresh songs....
    this._http.getSongs().subscribe(data => {
      this.SongsList = Array(data).filter(d=> d['hidden'] != true);
      this.getTop10(data);
      this.getSearchList(data);
    })

    //refresh reviews....
    this._http.getReviews().subscribe(data => {
      this.ReviewsList = data
    })


  }


  getSearchList(d){
    let temp = d.filter(d=> d.hidden === false);
      temp = temp.sort((a, b) => {
        return a.reviews - b.reviews;
      });

    this.SearchList = temp;

  }

//search songs
  softSearch(song){


    //attributes we want to match in our search....


      if(this.searchTerm){
        let artist = song['artist'].trim().toLocaleLowerCase()
        let album = song['album'].trim().toLocaleLowerCase()
        let title = song['title'].trim().toLocaleLowerCase()
        //compare search term to artist.....
        if(fuzz.ratio(artist, this.searchTerm.trim().toLocaleLowerCase()) > 75){
          return true
        }
        //compare search term to album....
        if(fuzz.ratio(album, this.searchTerm.trim().toLocaleLowerCase()) > 75){
          return true
        }
        
        //compare search term to tite....
        if(fuzz.ratio(title, this.searchTerm.trim().toLocaleLowerCase()) > 75){
          console.log(title)
          return true
        }
        
      }
    return false
  }


  ///////////////////////////////////////
  /////POP UP PANEL FUNCTIONALITIES//////
  //////////////////////////////////////

 //https://www.w3schools.com/howto/howto_css_modals.asp
    //generic function for opening the modal panel for arbitary class...
    openModalPanel(_class){
      let d = document.getElementsByClassName(_class) as HTMLCollectionOf<HTMLElement>;
      d[0].style.display = "block";
      this.openmodal()
    }

    //generic function for closing the panel.....
    closeModalPanel(_class,clear = null) {

      //get the panel that is specified....hide it....get the modal....hide it....
      let panel = document.getElementsByClassName(_class) as  HTMLCollectionOf<HTMLElement>;
      panel[0].style.display = "none";
      let modal = document.getElementById("myModal") as HTMLElement;
      modal.style.display = "none";

      //if specified, clear the entry that was entered in the modal...
      if(clear){
        console.log(clear)
        this.clearEntry(clear)
      }

    }

    //generic function for changing modal panel....
    changeModalPanel(_class, fn=null){ //close the panel and allow parameter for running a function...this function will be to open another panel...
      let panel = document.getElementsByClassName('search-container') as HTMLCollectionOf<HTMLElement>;
      panel[0].style.display = "none";
    }

    //open the panel to view the attributes for specified song....
    openAttributesPanel(id){
      let d = document.getElementsByClassName('view-attribute-container') as HTMLCollectionOf<HTMLElement>;
      d[0].style.display = "block";

      //update the view song.....
      this._http.getSong(id).subscribe(data => {
        this.viewSong = data;
        console.log(this.viewSong)

        //show the modal....
        this.openmodal()
      });
    
    }
    
    openReviewsPanel(id){

      let d = document.getElementsByClassName('view-reviews-container') as HTMLCollectionOf<HTMLElement>;
      d[0].style.display = "block";
      this._http.getSong(id).subscribe(data => {
        this.viewSong = data;
        console.log(this.viewSong)
        this.getReviews()
        this.openmodal()
      })
    }
    
    closeModalParam(x) {
      let panel = document.getElementsByClassName(x) as  HTMLCollectionOf<HTMLElement>;
      panel[0].style.display = "none";
      let modal = document.getElementById("myModal") as HTMLElement;
      modal.style.display = "none";
    }
    setUserClasses() {
      let myClasses = {
        active: this.loggedin,
        notactive: !this.loggedin
      };
      return myClasses;
    }

  getItem(id){
    this._http.getItem().subscribe(data => {
      console.log(data);
    });
  }

  getSong(id){
    
  }

  getReview(id){
    let review;
    this._http.getReview(id).subscribe(data=> {
      
      return data;
    })
  }

  getSongs(){
    this._http.getSongs().subscribe(data => {
      this.getTop10(data);
      this.updateSongs(data);
    });


  }

  updateSongs(d){
    this.SongsList = d;
    console.log(this.SongsList)
  }

  register(){
    let msg = ""
    
    if(!this.NewUser['email']) msg+="email must not be empty\n"
    if(!this.emailIsVal(this.NewUser['email'])) msg+="email is not valid format\n"
    if(!this.NewUser['password']) msg+="password must not be empty\n"

    if(msg!="")return alert(msg)

    this._http.register(this.NewUser).subscribe(data =>{
      console.log(data)
      if(data["notunique"])alert("invalid registration")
      else alert("succesful registration")
    })
  }
  
  login(){

    //sanitize the email....
    this.email = this.sanitize(this.email)
    let user: Object = {
      email: this.sanitize(this.email),
      password: this.sanitize(this.password),
      active: true,
      manager: false
    }
  
    //send the login data.....
    this._http.login(user).subscribe(data => {
      console.log(data)
      let msg =''

      //this.NewUser['email'] = this.sanitize( this.NewUser['email'])
      if(!this.NewUser['email']) msg+="email must not be empty\n"
      if(!this.emailIsVal(this.NewUser['email'])) msg+="email is not valid format\n"
      if(!this.NewUser['password']) msg+="password must not be empty\n"
  

      //If auth failed....
      if(data['message'] == "unverified"){
        let resend = confirm("Useer not validated, resend?")
        if(resend){
          this._http.resend(data['user']['_id']).subscribe()
          return alert("email resent")
        }else{
          return
        }
      } 
      if(data['message'] == "google") return alert("Must authenticate through google")
      if(data['message'] == "Auth failed") return alert("Not valid login")

      //If the user is not active....
      else if(!data['user']['active']){
          alert("Account is deactivated. Please contact Admin at siteadmin@mail.com.");
          return;
        }

        //otherwise allow them to login....
        this.NewUser['email'] = this.email
        this.loggedin = true;
        console.log('token...','Bearer ' + data['token'])
        this._http.httpOptions.headers = this._http.httpOptions.headers.set('Authorization', 'Bearer ' + data['token']);
        this.User = data['user'];
        this.data.changeUser(data['user'])
        this.data.changeLogged(true)
        this.data.changeOptions(this._http.httpOptions)
        this._http.setHeaders('Authorization', 'Bearer ' + data['token'])
        console.log(this._http.httpOptions.headers)
        return alert("Succesful login!")

    }
    );
  }

  sanitize(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  emailIsVal(e){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  sumbitSong(){

    let msg = ''

   if(!this.NewSong['title'] || !this.NewSong['artist']){
     this.clearEntry(this.NewSong)
     return alert('make sure both artist and title are included')
   }

    this._http.createSong(this.NewSong).subscribe(data =>{
      console.log(data);

      if(this.NewReview['review'] || this.NewReview['stars']){
        this.NewReview['songid'] = data['_id'];
        this.NewReview['email'] = data['email'];
        this.NewReview['title'] = data['title'];
        if(!this.NewReview['review'])this.NewReview['review'] == 'no comments'
        return this.sumbitReview();
      }
    });
   
    return this.closeModalPanel('addsong-container', null)

    
    
  }

  clearEntry(x){
    for(let key of Object.keys(x)){
        x[key] = ''
    }
  }

  openReviewPanel(id, title){
    if(!this.loggedin)return alert("authenticated user feature")
    let d = document.getElementsByClassName('review-container') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "block";
    this.NewReview['title'] = title;
    this.NewReview['songid'] = id;
    this.openmodal()
  }

  closeReviewPanel(){
    let d = document.getElementsByClassName('review-container') as HTMLCollectionOf<HTMLElement>;
    d[0].style.display = "none";
    this.clearEntry(this.NewReview)
    this.closeModal()
  }

  sumbitReview(){

    const songId =  this.NewReview['songid'];
    const rating = this.NewReview['stars']
    let reviewNew ;

    this.NewReview['email'] = this.User['email']

    if(typeof(this.NewReview['stars']) == "number" && rating <= 5 && rating >= 0 ){
        this.NewReview['stars'] = this.NewReview['stars']
        reviewNew = this.NewReview;
    }


    this._http.createReview(this.NewReview).subscribe(data =>{
      console.log(data);

      this._http.getSong(songId).subscribe(resp => {
        resp['reviews'] = resp['reviews'] + 1;
        resp['lastreview'] = data;

        updatedsong = resp;
        this._http.updateSong(songId, updatedsong).subscribe(response=>{})
  
      });
  
      
    });

    let updatedsong : Object;
    
 
    this.closeReviewPanel()
  }


  getTop10(d){

      let temp = d.filter(d=> d.hidden === false);
      temp = temp.sort((a, b) => {
        return a.reviews - b.reviews;
      });

      let ind = temp.length;
      let maxInd ;
      if(ind >= 10)maxInd = 10
      else maxInd = ind;
      this.topSongs = temp.splice(ind-maxInd, ind).reverse();


  }

 

  w3_close() {
    //document.getElementById("main").style.marginLeft = "0%";
    let bar = document.getElementsByClassName("sidebar") as HTMLCollectionOf<HTMLElement>
    bar[0].style.display = "none";
    //document.getElementById("openNav").style.display = "inline-block";
  }



// When the user clicks on the button, open the modal
openmodal () {
    // Get the modal
  let modal = document.getElementById("myModal") as HTMLElement;
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal() {
  let modal = document.getElementById("myModal") as HTMLElement;
  modal.style.display = "none";
}



closeSongPanel(){
  let d = document.getElementsByClassName('addsong-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "none";
  this.clearEntry(this.NewSong)
  this.closeModal()
}

openSongPanel(){
  let d = document.getElementsByClassName('addsong-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "block";
  this.openmodal()
}


viewAttributes(id){
  let d = document.getElementsByClassName('view-attribute-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "block";
  this._http.getSong(id).subscribe(data => {
    this.viewSong = data;
    console.log(this.viewSong)
    this.openmodal()
  });

}

closeAttributesPanel(){
  let d = document.getElementsByClassName('view-attribute-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "none";
  this.clearEntry(this.viewSong);
  this.closeModal()
}

viewReviews(id){
  let d = document.getElementsByClassName('view-reviews-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "block";
  this._http.getSong(id).subscribe(data => {
    this.viewSong = data;
    console.log(this.viewSong)
    this.getReviews()
    this.openmodal()
  })

  
}

closeReviews(){
  let d = document.getElementsByClassName('view-reviews-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "none";
  this.clearEntry(this.viewSong);
  this.closeModal()
}

getReviews(){

  this._http.getReviews().subscribe(data => {
    console.log(data);
    this.ReviewsList = data;
    console.log(this.ReviewsList)
  });

}

changeModal(){
  let d = document.getElementsByClassName('search-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "none";
  this.searchTerm = ''
}

openLoginPanel(){
  let d = document.getElementsByClassName('login-container') as HTMLCollectionOf<HTMLElement>;
  d[0].style.display = "block";
  this.openmodal();
  
}


average(id){
  
    let reviews: Array<any>;
    let sum: number = 0;
    let i:any;
    let average: number;
    
    reviews = this.ReviewsList.filter(d=>d.songid == id)
    reviews = reviews.filter(d => d.stars != null)
    for(i in reviews){
      sum = reviews[i].stars + sum;
    }

    average = sum/reviews.length;

    console.log('Average ', average)

    return average;



}

}
