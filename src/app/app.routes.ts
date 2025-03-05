import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    {path: 'posts', component: PostsComponent, pathMatch: 'full'},
    {path: 'post/:slug', component: PostComponent, pathMatch: 'full'}
];
