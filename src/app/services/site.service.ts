import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import YAML from 'yaml';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  site = signal(new Site());

  constructor(private _http: HttpClient) { }

  initSite() {
    this._http.get(`assets/site.yaml`, { responseType: 'text' }).subscribe({
      next: (ylConfig) => {
        const config = YAML.parse(ylConfig);
        this.site.set(config);
      },
      error: (err) => {
        console.error('Failed to get site config:', err);
      }
    });
  }
}
