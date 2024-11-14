import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  @Output() register = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    try {
      // Use firstValueFrom instead of toPromise
      const message: string = await firstValueFrom(this.apiService.handleRegister(this.username, this.password));

      if (message === 'User registered successfully') {
        this.register.emit(); // Trigger authentication in MainApp
      } else {
        this.error = message;
      }
    } catch (err) {
      this.error = 'An error occurred during registration';
    }
  }
}
