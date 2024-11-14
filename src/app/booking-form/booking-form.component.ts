import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  @Input() hall: any;
  @Input() date: Date | null = null;

  user = { name: '', phone: '' };

  constructor(private apiService: ApiService) {}

  handleBooking(): void {
    if (!this.hall || !this.date) return;

    this.apiService.createBooking(this.hall._id, this.date.toISOString(), this.user)
      .subscribe({
        next: () => {
          alert('Booking successful!');
          this.user = { name: '', phone: '' };
        },
        error: (err) => console.error('Booking failed', err)
      });
  }
}
