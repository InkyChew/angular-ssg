import { inject, Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { SiteService } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private _title = inject(Title);
  private _meta = inject(Meta);
  private _siteService = inject(SiteService);

  resetMeta(options: {
    title: string;
    description: string;
    keywords: string[];
    type: 'website' | 'article';
    coverImage?: string;
  }) {
    const siteName = this._siteService.site().title;
    const pageTitle = `${options.title}${options.title ? ' | ' : ''
      }${siteName}`;
    this._title.setTitle(pageTitle);

    const tags: MetaDefinition[] = [
      { name: 'keywords', content: options.keywords.join(',') },
      { name: 'description', content: options.description },
      { property: 'og:type', content: options.type },
      { property: 'og:title', content: pageTitle },
      { property: 'og:site_name', content: siteName },
      { property: 'og:description', content: options.description },
      { property: 'og:locale', content: 'zh-tw' },
      { name: 'og:image', content: options.coverImage || '' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: options.description },
    ];
    tags.forEach((tag) => {
      this._meta.removeTag(`name="${tag.name}"`);
      this._meta.removeTag(`property="${tag.property}"`);
      this._meta.addTag(tag);
    });
  }
}
