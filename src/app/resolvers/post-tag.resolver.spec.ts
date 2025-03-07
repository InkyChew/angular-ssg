import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postTagResolver } from './post-tag.resolver';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

describe('postTagResolver', () => {
  const executeResolver: ResolveFn<Observable<Post[]>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postTagResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
