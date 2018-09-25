import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

class Article {
  link: ""
  order: ""
  published: ""
  synopsis: ""
  text: ""
  title: ""
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class BlogService {
  articles: any;
  article: any;
  private origin_url: string;

  constructor(
    private http:HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string
  ) { 
    this.origin_url = `${origin}`;
  }

  listArticles(){
    return this.http.post(`${this.origin_url}/blog`, "", httpOptions);
  }

  getArticle(title){
    return this.http.post(`${this.origin_url}/blog/${title}`, "", httpOptions);
  }

}
