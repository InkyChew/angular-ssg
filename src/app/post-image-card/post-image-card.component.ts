import { Component, Input } from '@angular/core';
import { Post } from '../models/post';
import { RouterModule } from '@angular/router';
import { ExtractTextPipe } from '../pipes/extract-text.pipe';

@Component({
  selector: 'post-image-card',
  imports: [RouterModule, ExtractTextPipe],
  templateUrl: './post-image-card.component.html',
  styleUrl: './post-image-card.component.scss'
})
export class PostImageCardComponent {
  @Input({ required: true }) post!: Post;
}
