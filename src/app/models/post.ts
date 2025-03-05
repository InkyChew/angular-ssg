export interface IPostAttribute {
    title: string;
    slug: string;
    description: string;
    date: string;
    tags: string[];
    coverImage?: string;
    draft?: boolean;
}

export class Post {
    title: string = '';
    slug: string = '';
    description: string = '';
    date: string = '';
    tags: string[] = [];
    coverImage?: string;
    draft: boolean = false;
    content: string = '';
}