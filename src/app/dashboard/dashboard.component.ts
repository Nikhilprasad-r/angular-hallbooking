import { Component } from '@angular/core';
import { HallListComponent } from '../hall-list/hall-list.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { Hall } from '../models/hall.model';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,HallListComponent, DatePickerComponent, BookingFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedHall: Hall | null = null;
  selectedDate: Date | null = null;

  // Inject AuthService
  constructor(private authService: AuthService) {}

  // Handle hall selection
  onSelectHall(hall: Hall): void {
    this.selectedHall = hall;
    this.selectedDate = null; // Reset the date when a new hall is selected
  }

  // Handle date selection
  onDateSelect(date: Date): void {
    this.selectedDate = date;
  }

  // Logout method to reset authentication state
  onLogout(): void {
    this.authService.logout();
  }
}
