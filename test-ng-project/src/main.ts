import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

  // platformBrowserDynamic()
  //   .bootstrapModule(AppModule);
let test = (window as any).test;
if (test) {
  bootstrapFn();
  // platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
} else {
  bootstrapFn();
  // platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
}

function bootstrapFn(){
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
}