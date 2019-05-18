import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http:HttpClient) { }

  listArticles(){
    return this.http.post(`blog`, "", httpOptions);
  }

  getArticle(title){
    return this.http.post(`blog/${title}`, "", httpOptions);
  }

}
