export interface PostAttributes {
    title: string;
    slug: string;
    description: string;
    date: Date;
    tags: string[];
    coverImage?: string;
    draft?: boolean;
}