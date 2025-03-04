import { inject, Injectable } from '@angular/core';
import { marked } from 'marked';
import { PostAttributes } from '../models/post';
import { HttpClient } from '@angular/common/http';
import YAML from 'yaml';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  private _http = inject(HttpClient);

  fetchMarkdown(): void {
    this._http.get('assets/posts/first-post.md', { responseType: 'text' }).subscribe({
      next: (markdown) => {
        const data = this.parseMarkdown(markdown);
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching Markdown:', error);
      }
    }
    );
  }

  parseMarkdown(markdown: string) {
    const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s
    const yamlMetaMatch = markdown.match(markdownYamlMetaPattern);

    if (yamlMetaMatch && yamlMetaMatch.length > 1) {
      const yamlMeta = yamlMetaMatch[1];
      const content = markdown.replace(yamlMetaMatch[0], '');
      return {
        ...this.parseMarkdownMeta(yamlMeta),
        content: this.parseMarkdownContent(content)
      };
    }

    return { content: this.parseMarkdownContent(markdown) };
  }

  parseMarkdownMeta(yamlMeta: string) {
    const meta = YAML.parse(yamlMeta) as PostAttributes;
    const slug = meta.slug;

    return {
      title: meta.title,
      slug: slug,
      description: meta.description,
      date: new Date(meta.date)
        .toISOString()
        .slice(0, 19)
        .replace(/T/g, ' '),
      tags: meta.tags,
      coverImage: meta.coverImage,
      draft: !!meta.draft,
    }
  }

  parseMarkdownContent(content: string) {
    return marked.parse(content) as string;
  }
}
