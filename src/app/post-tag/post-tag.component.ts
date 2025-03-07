import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PostRowCardComponent } from '../post-row-card/post-row-card.component';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-tag',
  imports: [PostRowCardComponent],
  templateUrl: './post-tag.component.html',
  styleUrl: './post-tag.component.scss'
})
export class PostTagComponent {

  private _route = inject(ActivatedRoute);
  tag: string = this._route.snapshot.params['tag'];
  posts: WritableSignal<Post[]> = signal(this._route.snapshot.data['posts']);
}
