import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss']
})
export class FlexBoxComponent implements OnInit {

  str: string = "X 100";
  testBol = true;
  constructor() { }

  ngOnInit() {
  }

  inputClick(event){
    console.log("input!!!!!!!!!!!")
  }


}
