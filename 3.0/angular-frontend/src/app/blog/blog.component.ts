import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: any;

  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.listArticles().subscribe(info => {
      this.articles = info[0].title;
    })
  }

}
