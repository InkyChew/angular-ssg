import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts() {
    return this._http.get(`assets/posts.json`).pipe(
      map((posts) => Object.values(posts)),
      catchError(err => {
        console.error(`Failed to get posts:`, err);
        throw err;
      })
    )
  }

  getPost(slug: string) {
    return this._http.get(`assets/posts.json`).pipe(
      map((posts: any) => posts[slug]),
      catchError(err => {
        console.error(`Failed to get post(${slug}):`, err);
        throw err;
      })
    )
  }
}