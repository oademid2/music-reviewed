import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Add this
import { UserappComponent } from './userapp/userapp.component';
import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },// Add this
  { path: 'userapp', component: UserappComponent },// Add this
  { path: 'policy', component: PolicyComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
