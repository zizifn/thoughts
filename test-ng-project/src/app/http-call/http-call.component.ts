import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay, take, tap } from "rxjs/operators";
import { interval, noop } from "rxjs";

@Component({
  selector: "app-http-call",
  templateUrl: "./http-call.component.html",
  styleUrls: ["./http-call.component.scss"],
})
export class HttpCallComponent implements OnInit {
  url: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let source$ = interval(1000).pipe(take(5), shareReplay(2));
    source$.subscribe(
      (res) => console.log("1st time=>", res),
      noop,
      () => {
        console.log("completed 1 st");
      }
    );

    setTimeout(() => {
      source$.subscribe(
        (res) => console.log("2nd time=>", res),
        noop,
        () => {
          console.log("completed 2 st");
        }
      );
    }, 5000);
  }

  onHttpCall(event) {
    const http$ = this.http.get(
      "https://raw.githubusercontent.com/zizifn/thoughts/master/LICENSE",
      {
        responseType: "text",
      }
    );

    const tap$ = http$
      .pipe(
        tap(() => {
          console.log("tap iss");
        })
      )
      .pipe(shareReplay(2));
    http$.subscribe((reps) => {
      console.log("in resposne");
    });

    tap$.subscribe(
      noop,
      () => {
        console.log("completed");
      },
      () => {
        console.log("completed");
      }
    );
    tap$.subscribe(noop);
    tap$.subscribe(noop);

    setTimeout(() => {
      tap$.subscribe((value) => {
        console.log("in timeout");
      });
    });
  }
}
