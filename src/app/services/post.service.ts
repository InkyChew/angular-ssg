import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient,
    private _mdService: MarkdownService
  ) { }

  getPost(slug: string) {
    return this._http.get(`assets/posts/${slug}.md`, { responseType: 'text' })
      .pipe(
        map(markdown => this._mdService.parseMarkdown(markdown)),
        catchError(err => {
          console.error('Failed to get post:', err);
          throw err;
        })
      );
  }
}
