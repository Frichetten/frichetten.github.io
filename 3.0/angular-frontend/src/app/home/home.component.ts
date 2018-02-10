import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bandwidth : any;

  constructor(private http:Http) { }

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
