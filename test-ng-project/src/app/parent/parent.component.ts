import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  title = "Angular 8 - pass object to child";
  parentModel = { prop1: '1st prop', prop2: '2nd prop' }
  ind:boolean = true;
  str: string = "default";
  angularVersion = '8';
  size = 10;

  constructor() { }

  ngOnInit() {
  }

  updateModel() {
    this.size += 10;
    this.str += ' parent';
    this.ind = !this.ind;
    this.parentModel.prop1 += ' parent';
  }

}
