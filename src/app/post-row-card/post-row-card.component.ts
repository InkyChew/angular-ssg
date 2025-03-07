import { Component, Input } from '@angular/core';
import { Post } from '../models/post';
import { RouterModule } from '@angular/router';
import { ExtractTextPipe } from '../pipes/extract-text.pipe';

@Component({
  selector: 'post-row-card',
  imports: [RouterModule, ExtractTextPipe],
  templateUrl: './post-row-card.component.html',
  styleUrl: './post-row-card.component.scss'
})
export class PostRowCardComponent {

  @Input({ required: true }) post!: Post;
}
