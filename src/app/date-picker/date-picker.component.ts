import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() hall: any;
  @Output() dateSelect = new EventEmitter<Date>();
  bookedDates: { date: string; user: { name: string; phone: string } }[] = [];
  selectedBooking: { date: string; user: { name: string; phone: string } } | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.hall) {
      this.loadBookings();
    }
  }

  async loadBookings() {
    const bookings = await this.apiService.fetchBookings(this.hall._id).toPromise();
    this.bookedDates = bookings.map((booking: any) => ({
      date: new Date(booking.date).toDateString(),
      user: booking.user,
    }));
  }

  // Generate next 30 dates
  dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Method to check if the date is booked
  isBooked(date: Date): boolean {
    return this.bookedDates.some(b => new Date(b.date).toDateString() === date.toDateString());
  }

  // Handle the click on a booked date to show booking details
  handleBookedDateClick(booking: { date: string; user: { name: string; phone: string } }) {
    this.selectedBooking = booking;
  }

  // Handle the click on any date
  handleDateClick(date: Date) {
    const booking = this.bookedDates.find((b) => b.date === date.toDateString());
    if (booking) {
      this.handleBookedDateClick(booking);
    } else {
      this.selectedBooking = null;
      this.dateSelect.emit(date); // Emit selected date
    }
  }
}
