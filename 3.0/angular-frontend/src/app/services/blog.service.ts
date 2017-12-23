import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BlogService {
  articles: any;

  constructor(private http:Http) { }

  listArticles(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/blog', {headers: headers})
      .map(res => res.json());
  }

}
