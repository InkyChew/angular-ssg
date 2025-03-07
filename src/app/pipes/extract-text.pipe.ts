import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractText'
})
export class ExtractTextPipe implements PipeTransform {

  transform(html: string, ...args: unknown[]): unknown {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.split(/\s+/).join(' ');
  }

}