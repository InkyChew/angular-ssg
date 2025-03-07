import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRowCardComponent } from './post-row-card.component';

describe('PostRowCardComponent', () => {
  let component: PostRowCardComponent;
  let fixture: ComponentFixture<PostRowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
