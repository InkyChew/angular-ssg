export interface IPostAttribute {
    title: string;
    description: string;
    date: string;
    lastmod?: string;
    tags: string[];
    coverImage?: string;
    toc?: boolean;
    draft?: boolean;
}

export class Post implements IPostAttribute {
    slug: string = '';
    title: string = '';
    description: string = '';
    date: string = '';
    lastmod?: string;
    tags: string[] = [];
    coverImage?: string;
    toc: boolean = false;
    draft: boolean = false;
    content: string = '';
}