import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-http-call',
  templateUrl: './http-call.component.html',
  styleUrls: ['./http-call.component.scss']
})
export class HttpCallComponent implements OnInit {

  url: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onHttpCall(event){
    this.http.get("/path1").subscribe(reps => {
      console.log(reps);
    })
  }

}
