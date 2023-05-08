import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddPostComponent } from './add-post/add-post.component';



const routes: Routes = [
  {path : "", component: HomeComponent},
  {path : "login", component: LoginComponent},
  {path : "profile", component: ProfileComponent},
  {path : "addPost", component: AddPostComponent},
  {path : "**", redirectTo:""},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
