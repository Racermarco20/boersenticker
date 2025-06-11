import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';

  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  submit() {
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: () => this.error = 'Login fehlgeschlagen'
    });
  }
}
