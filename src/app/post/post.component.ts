import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostTocComponent } from '../post-toc/post-toc.component';
import { DatePipe } from '@angular/common';
import { fromEvent, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post',
  imports: [RouterModule, PostTocComponent, DatePipe, MatIconModule],
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

  goTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private _scroll$ = fromEvent(document, 'scroll').pipe(
    map(e => {
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;      
      return scrollPosition > 100;
    })
  );
  protected topVisible = toSignal(this._scroll$);
}
