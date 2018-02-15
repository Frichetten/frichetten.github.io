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
    this.meta.addTag({ name : 'description', content: this.article});
  }

  ngOnInit() {
    var title = this.router.url;
    title = title.substring(title.lastIndexOf("/")+1);
    this.blogService.getArticle(title).subscribe(info => {
      this.article = info;
    });
  }

}
