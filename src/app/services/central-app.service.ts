import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentralAppService {
  sidebarSubject = new BehaviorSubject(false);
  constructor() { }

  toggleSidebar(close:boolean = false){
    this.sidebarSubject.next(close)
  }
}
