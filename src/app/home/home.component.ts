import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

class bandwidth {
  data: ""
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public bandwidth : any;

  constructor(private http:HttpClient, private meta:Meta) {

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
}
