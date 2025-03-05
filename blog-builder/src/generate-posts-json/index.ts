import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readdirSync, writeFileSync } from 'fs';

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
        // .map(fileName => getMarkdownMeta(markdownPostsPath, fileName))
        // .filter(markdownMeta => !!markdownMeta)
        // .filter(markdownMeta => !markdownMeta?.draft)
        // .reduce((prev, markdownMeta) => ({
        //     ...prev,
        //     [markdownMeta!.slug]: {
        //         title: markdownMeta!.title,
        //         date: markdownMeta!.date,
        //         categories: markdownMeta!.categories,
        //         tags: markdownMeta!.tags,
        //         description: markdownMeta!.description,
        //         coverImage: markdownMeta!.coverImage
        //     }
        // }), {} as any)

    writeFileSync(targetJsonPath, JSON.stringify(posts));

    context.logger.info('✅ Done');
    return { success: true };
}