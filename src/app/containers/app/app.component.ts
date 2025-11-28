import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';
import { ThemeService, ThemeMode } from '../../services/theme.service';


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
  currentTheme: ThemeMode = 'light';

  constructor(private configurationService: ConfigurationService, private theme: ThemeService) {}

  ngOnInit() {
    this.getCurrentYear();
    this.version = this.configurationService.version;
    this.currentTheme = this.theme.getCurrent();
    this.theme.theme$.subscribe(mode => this.currentTheme = mode);
  }

  getCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }


  toggleTheme(): void {
    this.theme.toggle();
  }
}
