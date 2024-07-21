import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';


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
  version: string;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.getCurrentYear();
    this.version = this.configurationService.version;
  }

  getCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }


}
