import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexBoxComponent } from './flex-box/flex-box.component';


const routes: Routes = [
  {path: 'flexbox' , component: FlexBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
