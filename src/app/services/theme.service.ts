import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'sh-theme';
  private current: ThemeMode = 'light';
  private media = window.matchMedia('(prefers-color-scheme: dark)');

  readonly theme$ = new BehaviorSubject<ThemeMode>(this.getInitialTheme());

  constructor(private zone: NgZone) {
    this.applyTheme(this.theme$.value, false);

    this.media.addEventListener?.('change', (e) => {
      this.zone.run(() => {
        if (!this.getStoredTheme()) {
          const mode: ThemeMode = e.matches ? 'dark' : 'light';
          this.applyTheme(mode);
        }
      });
    });
  }

  toggle(): void {
    const next: ThemeMode = (this.current === 'dark') ? 'light' : 'dark';
    this.applyTheme(next);
  }

  applyTheme(mode: ThemeMode, persist: boolean = true): void {
    this.current = mode;
    document.documentElement.setAttribute('data-theme', mode);

    if (persist) {
      try {
        sessionStorage.setItem(this.storageKey, mode);
        document.cookie = `${this.storageKey}=${encodeURIComponent(mode)};path=/;max-age=31536000;samesite=lax`;
      } catch {
        console.error("Failed to save the theme choice");
      }
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', mode === 'dark' ? '#0b0f19' : '#f3f4f6');
    }
    this.theme$.next(mode);
  }

  getCurrent(): ThemeMode {
    return this.current;
  }

  private getInitialTheme(): ThemeMode {
    const stored = this.getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return this.media.matches ? 'dark' as ThemeMode : 'light' as ThemeMode;
  }

  private getStoredTheme(): ThemeMode | null {
    try {
      const session = sessionStorage.getItem(this.storageKey) as ThemeMode | null;
      if (session) {
        return session;
      }
      const regexMatch = document.cookie.match(/(?:^|; )sh-theme=([^;]+)/);
      return regexMatch ? (decodeURIComponent(regexMatch[1]) as ThemeMode) : null;
    } catch {
      return null;
    }
  }
}
