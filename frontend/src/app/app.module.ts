import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './alert.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    App,
    AlertComponent
  ],
  bootstrap: [App]
})
export class AppModule {
}
