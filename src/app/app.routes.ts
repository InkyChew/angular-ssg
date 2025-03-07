import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { postResolver } from './resolvers/post.resolver';
import { postsResolver } from './resolvers/posts.resolver';
import { PostTagComponent } from './post-tag/post-tag.component';
import { postTagResolver } from './resolvers/post-tag.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    {
        path: 'posts', component: PostsComponent,
        resolve: {
            posts: postsResolver
        }, pathMatch: 'full'
    },
    {
        path: 'post/:slug',
        component: PostComponent,
        resolve: {
            post: postResolver
        },
        pathMatch: 'full'
    },
    {
        path: 'post-tag/:tag',
        component: PostTagComponent,
        resolve: {
            posts: postTagResolver
        },
        pathMatch: 'full'
    }
];
