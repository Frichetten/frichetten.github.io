import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

class bandwidth {
  data: ""
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bandwidth : any;
  private origin_url: string;

  constructor(private router:Router, private http:HttpClient, private meta:Meta, @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.origin_url = origin;

    this.meta.updateTag({ name : 'description', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
    this.meta.updateTag({ property : 'og:url', content: 'https://frichetten.com'});
    this.meta.updateTag({ property : 'og:type', content: 'website'});
    this.meta.updateTag({ property : 'og:image', content: 'https://frichetten.com/images/home/profile.jpg'});
    this.meta.updateTag({ property : 'og:image:width', content: '200px'});
    this.meta.updateTag({ property : 'og:image:height', content: '200px'});
    this.meta.updateTag({ property : 'og:description', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
    this.meta.updateTag({ property : 'og:title', content: 'Nick Frichette'});
    this.meta.updateTag({ property : 'og:see_also', content: 'https://frichetten.com'});
    this.meta.updateTag({ name : 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name : 'twitter:title', content: 'Nick Frichette'});
    this.meta.updateTag({ name : 'twitter:description', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
    this.meta.updateTag({ name : 'twitter:image', content: 'https://frichetten.com/images/home/profile.jpg'});
  }

  ngOnInit() {
    this.checkBandwidth().subscribe(info => {
      this.bandwidth = info.data;
    });
  }

  checkBandwidth(){
    return this.http.post<bandwidth>(`${this.origin_url}/torbandwidth`, "", httpOptions);
  }

}
