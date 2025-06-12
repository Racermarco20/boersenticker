import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
