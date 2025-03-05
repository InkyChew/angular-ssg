import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteService } from './services/site.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private _siteService = inject(SiteService);

  ngOnInit() {
    this._siteService.initSite();
  }
}
