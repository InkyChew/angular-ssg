import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { map, ReplaySubject } from 'rxjs';

@Component({
  selector: 'post-toc',
  imports: [MatIconModule, FormsModule, NgClass, NgTemplateOutlet],
  templateUrl: './post-toc.component.html',
  styleUrl: './post-toc.component.scss'
})
export class PostTocComponent {

  @Input({ required: true }) contentElement!: HTMLElement;
  @Input() toggle: boolean = true;
  private _contentElement$ = new ReplaySubject<HTMLElement>(1);
  private _maxLevel: number = 3;
  hList = Array.from({ length: this._maxLevel - 1 }, (_, i) => `h${i + 2}`);

  ngAfterViewInit() {
    this._contentElement$.next(this.contentElement);
  }

  private headings$ = this._contentElement$.pipe(
    map(res => {
      const headers = res.querySelectorAll(this.hList.join(','));

      const tocList: IHeading[] = [];
      let temp: IHeading;
      headers.forEach((header, index) => {
        const level = +header.tagName.charAt(1);
        const heading: IHeading = {
          title: header.textContent!,
          level,
          id: header.id,
        };

        // If the level is higher than the last one, it's a subheading.
        if(temp && level > temp.level) {
          temp.sub = temp.sub || [];
          temp.sub.push(heading);
        } else {
          tocList.push(heading);
          temp = heading;
        }
      });

      // console.log(tocList);
      return tocList;
    })
  )

  protected headings = toSignal(this.headings$);
}

interface IHeading {
  title: string,
  level: number,
  id: string,
  sub?: IHeading[],
}
