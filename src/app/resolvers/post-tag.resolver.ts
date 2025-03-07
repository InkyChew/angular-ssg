import { ResolveFn } from '@angular/router';
import { PostTagService } from '../services/post-tag.service';
import { inject } from '@angular/core';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';

export const postTagResolver: ResolveFn<Observable<Post[]>> = (route, state) => {
  const _service = inject(PostTagService);
  const tag = route.paramMap.get('tag');

  if (!tag) return of([]);

  return _service.getTagPost(tag);
};
