import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    ErrorMessageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorMessageComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
