import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ParentComponent } from "./parent/parent.component";
import { ChildComponent } from "./parent/child/child.component";
import { FlexBoxComponent } from "./flex-box/flex-box.component";
import { ViewchildTestComponent } from "./viewchild-test/viewchild-test.component";
import { HookComponent } from "./hook/hook.component";
import { HttpCallComponent } from "./http-call/http-call.component";
import { ReduxTestComponent } from "./redux-test/redux-test.component";
import { LocalStore } from "./redux-test/local-store";
import { JamesWc } from "james-wc";
// window.customElements.define("james-wc", JamesWc);
@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    FlexBoxComponent,
    ViewchildTestComponent,
    HookComponent,
    HttpCallComponent,
    ReduxTestComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [LocalStore],
  entryComponents: [ViewchildTestComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
