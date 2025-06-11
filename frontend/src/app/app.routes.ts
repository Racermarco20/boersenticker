import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { TickerComponent } from './ticker.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: TickerComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
