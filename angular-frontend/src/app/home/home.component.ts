import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bandwidth : any;

  constructor(private http:Http, private meta:Meta) {
    this.meta.updateTag({ name : 'description', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
    this.meta.updateTag({ name : 'og:image', content: 'https://frichetten.com/images/home/profile.jpg'});
    this.meta.updateTag({ name : 'og:description', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
    this.meta.updateTag({ name : 'og:title', content: 'Nick Frichette'});
    this.meta.updateTag({ name : 'og:see_also', content: 'https://frichetten.com'});
    this.meta.updateTag({ name : 'twitter:card', content: 'The personal website of ' +
      'Nick Frichette, Software Developer and Security Researcher'});
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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/torbandwidth', {headers: headers})
      .map(res => res.json());
  }

}
