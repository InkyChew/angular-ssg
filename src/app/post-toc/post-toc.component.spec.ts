import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTocComponent } from './post-toc.component';

describe('PostTocComponent', () => {
  let component: PostTocComponent;
  let fixture: ComponentFixture<PostTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
