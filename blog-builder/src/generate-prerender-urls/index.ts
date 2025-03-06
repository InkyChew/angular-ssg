import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';
import { getPost, slugify, range } from './../../../utils';

interface Options extends JsonObject {
    markdownPostsPath: string;
    urlsPath: string;
}

const PAGE_SIZE = 10;

const getPageCount = (input: any[]) => Math.ceil(input.length / PAGE_SIZE);

export default createBuilder(generateUrls);

async function generateUrls(options: Options, context: BuilderContext): Promise<BuilderOutput> {
    const markdownPostsPath = options.markdownPostsPath;
    const urlsPath = options.urlsPath;

    const urls = [
        '/'
    ];

    context.logger.info(`🔁 Generate ${urlsPath}.`);

    const posts = readdirSync(markdownPostsPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
        .map(dirent => dirent.name)
        .map(fileName => getPost(markdownPostsPath, fileName));

    // post page
    context.logger.info(`📝 Generating post page.`);
    const postPages = posts.map(post => `/post/${post.slug}`);
    urls.push(...postPages);
    
    // posts pages
    context.logger.info(`📝 Generating post pages.`);
    const pageCount = getPageCount(posts);
    const postPageNumbers = range(1, pageCount + 1).map(pageNumber => `/posts/${pageNumber}`);
    urls.push(...postPageNumbers);

    // tags pages
    context.logger.info(`🏷  Generating tag pages.`);
    const tagsInPosts = posts
        .reduce((prev, curr) => ([...prev, ...(curr.tags || [])]), [] as string[])
        .filter(tag => !!tag);
    const tags = [...new Set(tagsInPosts)];
    const tagUrls = tags
        .reduce((prev, tagName) => {
            const tagSlug = slugify(tagName);
            const tagPosts = posts.filter(post => (post.tags || []).find(tag => tag === tagName));
            const tagPostsPageCount = getPageCount(tagPosts);

            return [
                ...prev,
                `/posts/tags/${tagSlug}`,
                ...(tagPostsPageCount > 1
                    ? range(1, tagPostsPageCount + 1).map(pageNumber => `/posts/tags/${tagSlug}/page/${pageNumber}`)
                    : [])
            ];
        }, []);
    urls.push(...tagUrls);

    //#endregion

    writeFileSync(urlsPath, urls.join('\n'));

    context.logger.info('✅ Done.');
    return { success: true };
}