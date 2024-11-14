import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hall-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css']
})
export class HallListComponent implements OnInit {
  halls: { _id: string; name: string }[] = [];
  newHall: string = '';

  @Output() selectHall = new EventEmitter<{ _id: string; name: string }>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  async loadHalls() {
    this.apiService.fetchHalls().subscribe({
      next: (data) => {
        this.halls = data;
      },
      error: (err) => console.error('Failed to load halls', err)
    });
  }

  handleAddHall(): void {
    if (this.newHall) {
      this.apiService.createHall(this.newHall).subscribe({
        next: (hall) => {
          this.halls.push(hall);
          this.newHall = '';
        },
        error: (err) => console.error('Failed to add hall', err)
      });
    }
  }
}
