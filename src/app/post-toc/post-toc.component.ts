import { Component, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, ReplaySubject } from 'rxjs';

@Component({
  selector: 'post-toc',
  imports: [],
  templateUrl: './post-toc.component.html',
  styleUrl: './post-toc.component.scss'
})
export class PostTocComponent {

  @Input({ required: true }) contentElement!: HTMLElement;
  private _contentElement$ = new ReplaySubject<HTMLElement>(1);

  ngAfterViewInit() {
    this._contentElement$.next(this.contentElement);
  }

  private headings$ = this._contentElement$.pipe(
    map(res => {
      const headers = res.querySelectorAll('h2, h3');

      const tocList: IHeading[] = [];
      headers.forEach(header => {
        if (header.tagName === 'H2') {
          tocList.push({ title: header.textContent!, level: 2, id: header.id });
        }
        if (header.tagName === 'H3') {
          tocList.push({ title: header.textContent!, level: 3, id: header.id });
        }
      });
      return tocList;
    })
  )

  protected headings = toSignal(this.headings$);
}

interface IHeading {
  title: string,
  level: number,
  id: string
}
