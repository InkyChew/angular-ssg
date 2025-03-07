import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImageCardComponent } from './post-image-card.component';

describe('PostImageCardComponent', () => {
  let component: PostImageCardComponent;
  let fixture: ComponentFixture<PostImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostImageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
