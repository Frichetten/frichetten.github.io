import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';

import { BlogService } from './services/blog.service';
import { ArticleComponent } from './article/article.component';
import { ContactmeComponent } from './contactme/contactme.component';
import { SafeHtmlComponent } from './safe-html/safe-html.component';

import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    {
      path:'blog',
      children: [
        {
          path: '',
          component: BlogComponent
        },
        {
          path: ':name',
          component: ArticleComponent
        }
      ]
    },
    { path:'contact', component: ContactmeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogComponent,
    ArticleComponent,
    ContactmeComponent,
    SafeHtmlComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'frichetten-com' }),
    BrowserTransferStateModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
