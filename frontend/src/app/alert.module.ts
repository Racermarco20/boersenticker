import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './alert.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, HttpClientModule, AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule {
}
