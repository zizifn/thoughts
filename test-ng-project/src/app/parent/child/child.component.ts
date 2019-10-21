import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() model;
  @Input() ind: boolean;
  @Input() str: string;

  @Input()  size: number | string;
  @Output() sizeChange = new EventEmitter<number|string>();

  updateModel() {
    this.str += ' child';
    this.ind = !this.ind;
    this.model.prop1 += ' child';
  }
  constructor() { }

  ngOnInit() {

  }
  ngOnChange(event:any){
    console.log("inside ngOnChange1 " + this.size)
  //this.size = event.target.value;
 // this.sizeChange.emit(this.size);

  }

  ngOnChange2(event:any){
    console.log("inside ngOnChange2 " + this.size)
  //this.size = event.target.value;
 // this.sizeChange.emit(this.size);

  }

}
