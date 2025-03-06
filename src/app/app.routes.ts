import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { postResolver } from './resolvers/post.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostsComponent, pathMatch: 'full' },
    {
        path: 'post/:slug',
        component: PostComponent,
        resolve: {
            post: postResolver
        },
        pathMatch: 'full'
    }
];
