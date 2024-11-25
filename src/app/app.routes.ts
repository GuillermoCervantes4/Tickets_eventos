import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { FichaComponent } from './pages/ficha/ficha.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ficha', component: FichaComponent},
  { path: '**', pathMatch:'full',redirectTo: 'home'}
];
