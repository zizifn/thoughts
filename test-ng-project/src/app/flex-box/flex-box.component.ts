import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, AfterViewInit, ViewChildren, Inject } from '@angular/core';
import { ParamMap, convertToParamMap} from '@angular/router'
import {Location} from '@angular/common'
import { ViewchildTestComponent } from '../viewchild-test/viewchild-test.component';

@Component({
  selector: 'app-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss']
})
export class FlexBoxComponent implements OnInit, AfterViewInit {


  @ViewChild('testViewChild',{static:false,read:ViewContainerRef})
  public testViewChild: ViewContainerRef;
  public testViewChildRef:ComponentRef<ViewchildTestComponent>;

  testViewChildInd = true;

  str: string = "X 100";
  testBol = true;
  constructor(
    public resolver: ComponentFactoryResolver,
    @Inject(Location) public location: Location
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const viewChildTestFac = this.resolver.resolveComponentFactory(ViewchildTestComponent);
    this.testViewChildRef = this.testViewChild.createComponent(viewChildTestFac);
  }

  inputClick(event){
    let test  = convertToParamMap({id:[1,2]});
    let test2  = convertToParamMap({});
    let test3  = convertToParamMap(null);

    console.log("input!!!!!!!!!!!")
  }

  testViewChildIndClick(){
    this.location.go('hook');
    this.testViewChildInd = !this.testViewChildInd;
    //this.testViewChild.parentInjector.
    console.log(this.testViewChild); // null
     console.log(this.testViewChildRef);
  }


}
