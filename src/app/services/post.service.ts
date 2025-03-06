import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, catchError, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this._http.get(`assets/posts.json`).pipe(
      map((posts) => Object.values(posts)),
      catchError(err => {
        console.error(`Failed to get posts:`, err);
        throw err;
      })
    )
  }

  getPost(slug: string): Observable<Post> {
    return this._http.get(`assets/posts.json`).pipe(
      map((posts: any) => posts[slug]),
      catchError(err => {
        console.error(`Failed to get post(${slug}):`, err);
        throw err;
      })
    )
  }
}