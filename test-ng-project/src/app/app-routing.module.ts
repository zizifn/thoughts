import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexBoxComponent } from './flex-box/flex-box.component';
import { HookComponent } from './hook/hook.component';
import { HttpCallComponent } from './http-call/http-call.component';
import { ReduxTestComponent } from './redux-test/redux-test.component';


const routes: Routes = [
  {path: 'flexbox' , component: FlexBoxComponent},
  {path: 'hook' , component: HookComponent},
  {path: 'http-call' , component: HttpCallComponent},
  {path: 'redux-test' , component: ReduxTestComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
