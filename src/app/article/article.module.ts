import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SafeHtmlComponent } from '../safe-html/safe-html.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {

  article : any;

  constructor(private router:Router, private http:HttpClient, private meta:Meta) {
    var title = this.router.url;
    title = title.substring(title.lastIndexOf("/")+1);

    this.http.get(`/blogarticles/${title}`)
      .subscribe(info => {

        if (info == null) {
          this.router.navigate(['/404']);
        }
        else {
          this.article = info;
    
          this.meta.updateTag({ name : 'description', content: this.article.synopsis });
          this.meta.updateTag({ property : 'og:url', content: 'https://frichetten.com/blog/'+this.article.link });
          this.meta.updateTag({ property : 'og:type', content: 'website' });
          this.meta.updateTag({ property : 'og:image', content: 'https://frichetten.com/images/thumbs/'+this.article.link });
          this.meta.updateTag({ property : 'og:image:width', content: '200px'});
          this.meta.updateTag({ property : 'og:image:height', content: '200px'});
          this.meta.updateTag({ property : 'og:description', content: this.article.synopsis });
          this.meta.updateTag({ property : 'og:title', content: this.article.title});
          this.meta.updateTag({ property : 'og:see_also', content: 'https://frichetten.com'});
          this.meta.updateTag({ name : 'twitter:card', content: 'summary'});
          this.meta.updateTag({ name : 'twitter:title', content: this.article.title });
          this.meta.updateTag({ name : 'twitter:description', content: this.article.synopsis });
          this.meta.updateTag({ name : 'twitter:image', content: 'https://frichetten.com/images/thumbs/'+this.article.link });
        }
    });
  }
}

@NgModule({
  declarations: [ArticleComponent, SafeHtmlComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ArticleComponent }
    ])
  ],
  exports: [ SafeHtmlComponent ]
})
export class ArticleModule {}