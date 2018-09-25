import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { BlogService } from './services/blog.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleResolver implements Resolve<any> {

  constructor(private blogservice: BlogService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.blogservice.getArticle("oscp-review");
  }

}