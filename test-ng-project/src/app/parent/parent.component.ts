import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
} from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ParentComponent implements OnInit {
  title = "Angular 8 - pass object to child";
  parentModel = { prop1: "1st prop", prop2: "2nd prop" };
  ind: boolean = true;
  str: string = "default";
  angularVersion = "8";
  private _size = 10.216;
  public get size() {
    return this._size;
  }
  public set size(value) {
    this._size = value;
  }
  subject = new Subject<string>();

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    (window as any).testSubject = this.subject;
  }

  updateModel() {
    // this.subject.next(this.size.toString())
    this.size += 10;
    this.str += " parent";
    this.ind = !this.ind;
    this.parentModel.prop1 += " parent";
  }
  clickTest() {
    console.log("click Test");
  }
  subscribeClick() {
    this.subject.subscribe({
      next: (v) => {
        console.log(`add ${v} into size`);
        var test = v;
        for (let i = 1; i < 10000000; i++) {
          test += "d";
        }
        console.log(`add ${v} into in 1 subscribe`);
        this.size += 10;
        // setTimeout( () => console.log("inside subject"), 1000)
        // this.updateModel();
      },
    });

    this.subject.subscribe({
      next: (v) => {
        console.log(`add ${v} into size in 2 subscribe`);
      },
    });

    this.subject.subscribe({
      next: (v) => {
        console.log(`add ${v} into size in 3 subscribe`);
      },
    });
  }

  sentNext() {
    setInterval((value) => {
      console.log("send 10 from sentNext-Interval");
      this.subject.next("10");
    }, 1000);
  }
}
