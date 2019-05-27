import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';

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
          { path: '', loadChildren: './blog/blog.module#BlogModule' },
          { path: ':name', loadChildren: './article/article.module#ArticleModule' }
        ]
      },
      { path: 'contact', loadChildren: './contactme/contactme.module#ContactmeModule'}
    ]),
    TransferHttpCacheModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
