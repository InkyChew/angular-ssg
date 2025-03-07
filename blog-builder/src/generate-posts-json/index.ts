import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';
import { getPost } from './../../../utils/post';

interface Options extends JsonObject {
    markdownPostsPath: string;
    targetJsonPath: string;
}

export default createBuilder(generatePostsJson);

async function generatePostsJson(options: Options, context: BuilderContext): Promise<BuilderOutput> {
    const markdownPostsPath = options.markdownPostsPath;
    const targetJsonPath = options.targetJsonPath;

    context.logger.info(`📃 Generate ${targetJsonPath} from markdown files in ${markdownPostsPath}`);

    const posts = readdirSync(markdownPostsPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
        .map(dirent => dirent.name)
        .map(fileName => getPost(markdownPostsPath, fileName))
        .filter(post => !!post)
        .filter(post => !post.draft)
        .filter(post => new Date(post.date) <= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reduce((prev, post) => ({
            ...prev,
            [post!.slug]: {
                ...post
            }
        }), {} as any)

    writeFileSync(targetJsonPath, JSON.stringify(posts));

    context.logger.info('✅ Done');
    return { success: true };
}