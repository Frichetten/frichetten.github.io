import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

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
