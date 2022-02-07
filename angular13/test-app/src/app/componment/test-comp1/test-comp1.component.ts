import { ChangeDetectorRef, Component, OnInit, ɵdetectChanges } from '@angular/core';

@Component({
  selector: 'app-test-comp1',
  templateUrl: './test-comp1.component.html',
  styleUrls: ['./test-comp1.component.scss']
})
export class TestComp1Component implements OnInit {

  testItem = 'default';
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    document.getElementById("btn1")?.addEventListener('click', () => {
      console.log("from click")
      this.testItem = "value from click";
      console.log(this.testItem);
      // this.cdr.detectChanges();
      // ɵdetectChanges(this);
      // markDirty()
    })
  }
}

