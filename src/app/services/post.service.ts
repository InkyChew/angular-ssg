import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { IPostAttribute, Post } from '../models/post';
import { marked } from 'marked';
import YAML from 'yaml';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  getPost(slug: string) {
    return this._http.get(`assets/posts/${slug}.md`, { responseType: 'text' })
      .pipe(
        map(markdown => this.parseMarkdown(markdown)),
        catchError(err => {
          console.error('Failed to get post:', err);
          throw err;
        })
      );
  }

  parseMarkdown(markdown: string): Post {
    const post = new Post();
    const yamlPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s
    const yamlMatch = markdown.match(yamlPattern);

    if (yamlMatch && yamlMatch.length > 1) {
      const ylMeta = yamlMatch[1];
      const mdContent = markdown.replace(yamlMatch[0], '');
      return {
        ...post,
        ...parseYamlMeta(ylMeta),
        content: parseMarkdownContent(mdContent)
      };
    }

    return { ...post, content: parseMarkdownContent(markdown) };
  }
}

const parseYamlMeta = (meta: string): IPostAttribute => {
  return YAML.parse(meta) as IPostAttribute;
}

const parseMarkdownContent = (content: string) => {
  return marked.parse(content) as string;
}