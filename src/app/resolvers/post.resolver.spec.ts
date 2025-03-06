import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { postResolver } from './post.resolver';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

describe('postResolver', () => {
  const executeResolver: ResolveFn<Observable<Post | null>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
