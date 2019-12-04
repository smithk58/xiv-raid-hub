import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from 'src/app/api-injection-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, @Inject(BASE_API_URL) private baseAPIUrl: string) { }
  ngOnInit() {
    this.http.get('api/movies/1').subscribe(res => {
      console.log('res', res);
    });
  }
}
