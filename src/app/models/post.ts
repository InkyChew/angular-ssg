export interface IPostAttribute {
    title: string;
    description: string;
    date: string;
    tags: string[];
    coverImage?: string;
    draft?: boolean;
}

export class Post {
    slug: string = '';
    title: string = '';
    description: string = '';
    date: string = '';
    tags: string[] = [];
    coverImage?: string;
    draft: boolean = false;
    content: string = '';
}