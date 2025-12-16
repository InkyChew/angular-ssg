import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { IPostAttribute, Post } from '../src/app/models/post';
import { parse as yamlParse } from 'yaml';

export const getPost = (folderPath: string, fileName: string): Post | null => {
    const filePath = join(folderPath, fileName);
    const fileContent = readFileSync(filePath).toString('utf-8');
    // replace `.md` as slug
    const slug = fileName.substring(0, fileName.length - 3);
    return parseMarkdown(fileContent, slug);
}


export const parseMarkdown = (markdown: string, slug: string): Post | null => {
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
            content: parseMarkdownContent(mdContent)
        }
    }

    return null;
}

const parseYamlMeta = (meta: string): IPostAttribute => {
    return yamlParse(meta) as IPostAttribute;
}

const parseMarkdownContent = (content: string) => {
    const htmlContent = marked.parse(content) as string;
    return transformContent(htmlContent);
}

const transformContent = (content: string) =>
    // title anchor
    content.replace(
        /<h([1-6])(.*)>(.*)<\/h([1-6])>/g,
        (match, head1, headAttr, title, head2) => {
            const slug = title.trim().replace(/ /g, '-').toLowerCase();
            return `<h${head1}${headAttr} id="${slug}">${title}</h${head2}>`;
        }
    )
