import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig, ConfigurationService } from './app/services/configuration.service';

export const provideAppInitializer = () => {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
    deps: [HttpClient, ConfigurationService],
  };
};

function initializeApp(http: HttpClient, configurationService: ConfigurationService) {
  return (): Promise<unknown> => firstValueFrom(
    http.get("/assets/config.json")
      .pipe(
        tap((config: AppConfig) => {
          configurationService.loadConfiguration(config);
          return config;
        })
      )
  );
}
