import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  @Output() login = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    try {
      const message: string = await firstValueFrom(
        this.apiService.handleLogin(this.username, this.password)
      );

      if (message === 'User logged in successfully') {
        this.login.emit(); // Emit the event to notify successful login
      } else {
        this.error = message;
      }
    } catch (err) {
      this.error = 'An error occurred during login';
    }
  }
}
