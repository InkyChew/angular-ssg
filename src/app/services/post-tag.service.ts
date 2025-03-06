import { inject, Injectable } from '@angular/core';
import { PostService } from './post.service';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostTagService {

  private _postService = inject(PostService);

  getTagPost() {
    return this._postService.getPosts().pipe(
      map((posts: Post[]) => {
        const tagPostMap = new Map<string, Post[]>();

        posts.forEach(post => {
          post.tags.forEach(tag => {
            if (tagPostMap.has(tag)) {
              tagPostMap.get(tag)?.push(post);
            } else {
              tagPostMap.set(tag, [post]);
            }
          });
        });

        return tagPostMap;
      })
    );
  }
}
