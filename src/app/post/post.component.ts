import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { PostService } from '../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { MetaService } from '../services/meta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  private _service = inject(PostService);
  private _domSanitizer = inject(DomSanitizer);
  private _metaService = inject(MetaService);
  private _route = inject(ActivatedRoute);
  post: WritableSignal<Post> = signal(new Post());

  ngOnInit() {
    this._route.params.subscribe(pms => {
      const slug: string = pms['slug'];
      this.getPost(slug);      
    });
  }

  getPost(slug: string) {
    this._service.getPost(slug).subscribe(res => this.post?.set(res));
  }

  protected postContent = computed(() => {
    return this._domSanitizer.bypassSecurityTrustHtml(
      this.post().content!
    );
  });

  private _updateMetaEffect = effect(() => {
    this._metaService.resetMeta({
      title: this.post().title!,
      type: 'article',
      description: this.post()
        .description!.replace(/<[^>]*>/gm, '')
        .replace(/\n/g, '')
        .trim(),
      keywords: this.post().tags || [],
      coverImage: this.post().coverImage,
    });
  });
}
