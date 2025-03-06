import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostService } from '../services/post.service';
import { Observable, of, tap } from 'rxjs';
import { Post } from '../models/post';
import { MetaService } from '../services/meta.service';

export const postResolver: ResolveFn<Observable<Post | null>> = (route, state) => {
  const _service = inject(PostService);
  const _metaService = inject(MetaService);
  const slug = route.paramMap.get('slug');

  if (!slug) return of(null);

  return _service.getPost(slug).pipe(
    tap(post => setPostMeta(_metaService, post))
  );
};

const setPostMeta = (service: MetaService, post: Post) => {
  service.resetMeta({
    title: post.title,
    type: 'article',
    description: post.description
      .replace(/<[^>]*>/gm, '')
      .replace(/\n/g, '')
      .trim(),
    keywords: post.tags || [],
    coverImage: post.coverImage,
  });
}