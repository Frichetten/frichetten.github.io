import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent {

  articles: any;

  constructor(private meta:Meta, private http:HttpClient) {
    this.http.get('/blogarticles')
      .subscribe(info => this.articles = info);
  }
}

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogComponent }
    ])
  ]
})
export class BlogModule {}