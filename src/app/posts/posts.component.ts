import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-posts',
  imports: [RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  private _service = inject(PostService);
  posts: WritableSignal<Post[]> = signal([]);

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._service.getPosts().subscribe(res => {
      this.posts.set(res);
    });
  }
}
