import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatIconModule],
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

  getSummary(html: string, wordLimit: number = 50): string {
    // Parse the HTML to extract text content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";

    // Split the text into words and limit the number of words to the given limit
    const words = textContent.split(/\s+/).join(' '); // Split by any whitespace character
    return words.substring(0, wordLimit);
  }
}
