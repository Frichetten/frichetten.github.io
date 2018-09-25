import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article : any;

  constructor(private router:Router, private blogService:BlogService, private meta:Meta) {
    var title = this.router.url;
    title = title.substring(title.lastIndexOf("/")+1);

    this.blogService.getArticle(title).subscribe(info => {
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
    })
  }

  ngOnInit() {
    
  }

}
