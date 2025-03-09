import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostTocComponent } from '../post-toc/post-toc.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [RouterModule, PostTocComponent, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  private _domSanitizer = inject(DomSanitizer);
  private _route = inject(ActivatedRoute);
  post: WritableSignal<Post> = signal(this._route.snapshot.data['post']);

  protected postContent = computed(() => {
    return this._domSanitizer.bypassSecurityTrustHtml(
      this.post().content
    );
  });
}
