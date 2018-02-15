import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: any;

  constructor(private blogService:BlogService, private meta:Meta) {
    this.meta.addTag({ name : 'description', content: 'My blog where I cover ' +
      'topics ranging from programming to security'});
  }

  ngOnInit() {
    this.blogService.listArticles().subscribe(info => {
      this.articles = info;
    });
  }

}
