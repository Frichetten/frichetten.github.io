import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      {
        path: 'blog',
        children: [
          { path: '', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
          { path: ':name', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) }
        ]
      },
      { path: 'contact', loadChildren: () => import('./contactme/contactme.module').then(m => m.ContactmeModule)},
      { path: 'health', loadChildren: () => import('./health/health.module').then(m => m.HealthModule) },
      { path: '**', loadChildren: () => import('./notfound/notfound.module').then(m => m.NotFoundModule) }
    ]),
    TransferHttpCacheModule,
    HttpClientModule,
    LazyLoadImageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
