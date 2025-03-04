import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { IPostAttribute, Post } from '../models/post';
import YAML from 'yaml';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  parseMarkdown(markdown: string): Post {
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

  parseMarkdownMeta(yamlMeta: string): Post {
    const meta = YAML.parse(yamlMeta) as IPostAttribute;
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
