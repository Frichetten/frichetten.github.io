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
    this.meta.updateTag({ name : 'og:description', content: "first" });
    var title = this.router.url;
    title = title.substring(title.lastIndexOf("/")+1);
    this.blogService.getArticle(title).subscribe(info => {
      this.article = info;
    })
    //this.meta.updateTag({ name : 'description', content: this.route.snapshot.data['article'].synopsis });
    //this.meta.updateTag({ name : 'twitter:title', content: this.route.snapshot.data['article'].title });
    this.meta.updateTag({ name : 'twitter:description', content: "no luck" });
    //this.blogService.getArticle(title).subscribe(info => {
      //this.article = info;
      //this.meta.updateTag({ name : 'description', content: info.synopsis});
      //this.meta.updateTag({ property : 'og:image', content: 'https://frichetten.com/images/thumbs/'+info.link});
      //this.meta.updateTag({ property : 'og:image:width', content: '200px'});
      //this.meta.updateTag({ property : 'og:image:height', content: '200px'});
      //this.meta.updateTag({ property : 'og:description', content: info.synopsis});
      //this.meta.updateTag({ property : 'og:title', content: info.title});
      //this.meta.updateTag({ property : 'og:see_also', content: 'https://frichetten.com'});
      //this.meta.updateTag({ name : 'twitter:title', content: info.title});
      //this.meta.updateTag({ name : 'twitter:description', content: info.synopsis});
      //this.meta.updateTag({ name : 'twitter:image', content: 'https://frichetten.com/images/thumbs/'+info.link});
      //this.meta.updateTag({ name: 'twitter:card', content: 'summary'})
    //});
  }

  ngOnInit() : void {

  }

}
