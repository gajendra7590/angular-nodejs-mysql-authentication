import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventsComponent } from './components/events/events.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:"",component:HomeComponent,pathMatch:"full" },
  { path:"home",component:HomeComponent },
  { path: "login", component:LoginComponent },
  { path: "register", component:RegisterComponent },
  { path: "logout", component:LogoutComponent,canActivate:[AuthGuard] },
  { path: "events", component:EventsComponent ,canActivate:[AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
