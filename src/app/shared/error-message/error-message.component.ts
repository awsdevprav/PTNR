import { Component, OnInit, Input } 
from '@angular/core';
import { APP_ERROR_MESSAGES } from 'app/core/constants/error';
/**
 * This is use for reactive form validation
 * start
 */
/**
 * end
 */
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() isOnlySubmit;
  @Input() formControls:any;
  @Input() inputKey:any;
  @Input() showError:any;
  @Input() isSubmit:any;
  @Input() messageModule:any;
  @Input() isDirty
  authError:any;
  messages:any;
  f:any;
  bErrorDisplayed:boolean
  constructor() { }
  
  ngOnInit() { 
    //console.log("formcontrol=========>",this.inputKey,this.messageModule,this.formControls)
    this.authError =APP_ERROR_MESSAGES[this.messageModule];
    this.f = this.formControls[this.inputKey]
    this.messages = this.authError[this.inputKey]
    
  } 

  getObjectLength(obj,messages){
    console.log('obj===>', obj)
    for(let i of (this.messages)){
      // console.log("Object.keys(obj).length",obj, i.type)
      if(obj[i.type]){
        return i.message; //Object.keys(obj).length;
      }
    }
  }
}
