import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { IPostAttribute, Post } from '../src/app/models/post';
import * as YAML from 'yaml';

export const getPost = (folderPath: string, fileName: string) => {
    const filePath = join(folderPath, fileName);
    const fileContent = readFileSync(filePath).toString('utf-8');
    // replace `.md` as slug
    const slug = fileName.substring(0, fileName.length - 3);
    return parseMarkdown(fileContent, slug);
}


export const parseMarkdown = (markdown: string, slug: string) => {
    const post = new Post();
    const yamlPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s
    const yamlMatch = markdown.match(yamlPattern);

    if (yamlMatch && yamlMatch.length > 1) {
        const ylMeta = yamlMatch[1];
        const meta = parseYamlMeta(ylMeta);
        const mdContent = markdown.replace(yamlMatch[0], '');

        return {
            ...post,
            ...meta,
            slug: slug,
            date: new Date(meta.date)
                .toISOString()
                .slice(0, 19)
                .replace(/T/g, ' '),
            content: parseMarkdownContent(mdContent)
        }
    }

    return null;
}

const parseYamlMeta = (meta: string): IPostAttribute => {
    return YAML.parse(meta) as IPostAttribute;
}

const parseMarkdownContent = (content: string) => {
    return marked.parse(content) as string;
}