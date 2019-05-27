import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http:HttpClient) {
      this.http.get<any>(`/torbandwidth`)
        .subscribe(data => this.bandwidth = data.data);
  }
}
