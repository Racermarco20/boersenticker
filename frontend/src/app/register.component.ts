import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  submit() {
    this.auth.register(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.error = 'Registrierung fehlgeschlagen'
    });
  }
}
