import { isPlatformBrowser } from '@angular/common';
import { inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';

@Pipe({
  name: 'extractText'
})
export class ExtractTextPipe implements PipeTransform {
  private platformId = inject(PLATFORM_ID);
  transform(html: string, ...args: unknown[]): string {

    if (isPlatformBrowser(this.platformId)) {
      const doc = new DOMParser().parseFromString(html, 'text/html');

      return (doc.body.textContent || '')
        .split(/\s+/)
        .join(' ');
    }

    return '';
  }

}