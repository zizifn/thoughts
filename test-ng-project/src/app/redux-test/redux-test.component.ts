import { Component, OnInit, Inject } from '@angular/core';
import { LocalStore } from './local-store';

@Component({
  selector: 'app-redux-test',
  templateUrl: './redux-test.component.html',
  styleUrls: ['./redux-test.component.scss']
})
export class ReduxTestComponent implements OnInit {

  private i = 0;

  constructor(@Inject(LocalStore) public store: LocalStore) { }

  ngOnInit() {
  }

  onMyClick(event){
    this.store.setState({
      someModel :[{
        name: "click" + this.i++
      }]
    });
  }

}
