import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.css']
})
export class ContactmeComponent implements OnInit {

  constructor(private router:Router, private meta:Meta) {
    this.meta.updateTag({ name : 'description', content: 'How to contact me'});
    this.meta.updateTag({ property : 'og:url', content: 'https://frichetten.com'});
    this.meta.updateTag({ property : 'og:type', content: 'website'});
    this.meta.updateTag({ property : 'og:image', content: 'https://frichetten.com/images/home/profile.jpg'});
    this.meta.updateTag({ property : 'og:image:width', content: '200px'});
    this.meta.updateTag({ property : 'og:image:height', content: '200px'});
    this.meta.updateTag({ property : 'og:description', content: 'How to contact me'});
    this.meta.updateTag({ property : 'og:title', content: 'Nick Frichette'});
    this.meta.updateTag({ property : 'og:see_also', content: 'https://frichetten.com'});
    this.meta.updateTag({ name : 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name : 'twitter:title', content: 'Nick Frichette'});
    this.meta.updateTag({ name : 'twitter:description', content: 'How to contact me'});
    this.meta.updateTag({ name : 'twitter:image', content: 'https://frichetten.com/images/home/profile.jpg'});
  }

  ngOnInit() {
  }

}
