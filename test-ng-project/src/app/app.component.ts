import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  _title = "test-ng-project";

  get title() {
    return this._title;
  }

  set title(val: string) {
    console.log("change tile from input box two way binding " + val);
    this._title = val;
  }
}
