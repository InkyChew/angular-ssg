import { Component, Input } from '@angular/core';
import { Post } from '../models/post';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'post-image-card',
  imports: [RouterModule],
  templateUrl: './post-image-card.component.html',
  styleUrl: './post-image-card.component.scss'
})
export class PostImageCardComponent {
  @Input({required: true}) post!: Post;

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
