import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postsResolver } from './posts.resolver';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

describe('postsResolver', () => {
  const executeResolver: ResolveFn<Observable<Post[]>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
