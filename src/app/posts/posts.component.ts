import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../models/post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { PostImageCardComponent } from '../post-image-card/post-image-card.component';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatIconModule, PostImageCardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  private _route = inject(ActivatedRoute);
  posts: WritableSignal<Post[]> = signal(this._route.snapshot.data['posts']);

  ngOnInit() { }
}
