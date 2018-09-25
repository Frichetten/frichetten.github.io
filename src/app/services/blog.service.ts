import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Article {
  link: string,
  order: number,
  published: string,
  synopsis: string,
  text: string,
  title: string
}

@Injectable()
export class BlogService {
  articles: any;
  article: any;

  constructor(private http:Http) { }

  listArticles(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/blog', {headers: headers})
      .pipe(map(res => res.json()));
  }

  getArticle(title){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/blog/'+title, {headers: headers})
      .pipe(map(res => res.json()));
  }

}
