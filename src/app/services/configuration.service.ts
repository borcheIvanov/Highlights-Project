import { Injectable } from '@angular/core';

export interface AppConfig {
  version: string;
  youTubeKey: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configuration: AppConfig;

  constructor() { }

  public loadConfiguration = (config: AppConfig) => {
    console.log("loading ", config);
    this.configuration = config;
  };

  get version():string {
    return this.configuration.version;
  }

  get youTubeKey():string {
    return this.configuration.youTubeKey;
  }
}
