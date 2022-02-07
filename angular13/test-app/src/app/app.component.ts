import { Component, ɵdetectChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';

  public mainid1() {
    this.title = "test main";
    // ɵdetectChanges(this);

  }
}
