import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';

export const routes: Routes = [
{ path:'', component:SignUpComponent},
{ path:'sign-up', loadComponent:()=>import('./pages/login/sign-up/sign-up.component').then(m=>m.SignUpComponent)},
{ path:'sign-in', loadComponent:()=>import('./pages/login/sign-in/sign-in.component').then(m=>m.SignInComponent)}


];
