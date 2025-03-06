import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

export const postsResolver: ResolveFn<Observable<Post[]>> = (route, state) => {
  const _service = inject(PostService);
  return _service.getPosts().pipe();
};
