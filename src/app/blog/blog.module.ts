import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent {

  articles: any;

  constructor(private meta:Meta, private http:HttpClient) {
    this.http.get('/blogarticles')
      .subscribe(info => this.articles = info);

    this.meta.updateTag({ name : 'description', content: 'My blog where I cover ' +
      'software development and information security'});
    this.meta.updateTag({ property : 'og:image', content: 'https://frichetten.com/images/home/profile.jpg'});
    this.meta.updateTag({ property : 'og:image:width', content: '200px'});
    this.meta.updateTag({ property : 'og:image:height', content: '200px'});
    this.meta.updateTag({ property : 'og:description', content: 'My blog where I cover ' +
      'software development and information security'});
    this.meta.updateTag({ property : 'og:title', content: 'Blog'});
    this.meta.updateTag({ property : 'og:see_also', content: 'https://frichetten.com'});
    this.meta.updateTag({ name : 'twitter:title', content: 'Blog'});
    this.meta.updateTag({ name : 'twitter:description', content: 'My blog where I cover ' +
      'software development and information security'});
    this.meta.updateTag({ name : 'twitter:image', content: 'https://frichetten.com/images/home/profile.jpg'});
    this.meta.updateTag({ name: 'twitter:card', content: 'summary'});
  }
}

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogComponent }
    ])
  ]
})
export class BlogModule {}