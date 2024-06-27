import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ]
})
export class AppComponent implements OnInit {
  currentYear: number;

  constructor() {}

  ngOnInit() {
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }


}
