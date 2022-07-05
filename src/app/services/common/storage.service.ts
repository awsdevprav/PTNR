import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private storageCollection = new Subject<{ key: string, value: any }>();
  public changes = this.storageCollection.asObservable().share();

  private getFormFieldOption = new BehaviorSubject({BookingCargoTypes : [] , BookingShipmentType : [] , CargoMeasure : [] ,CargoTypes : [] ,Commodity:[], ContainerType:[],Country:[] , ImoClass:[], PackingGroup:[],PackingTypes:[],ShippingFrequency:[],TempratureMeasure:[],Unnumber:[], WeightMeasure:[]});
  countryDataCast = this.getFormFieldOption.asObservable();

  private serviceData = new BehaviorSubject({});
  serviceDataCast = this.serviceData.asObservable();

  constructor() { 
    this.start();
  }

  

  updateFormFieldOptions(newData){
    this.getFormFieldOption.next(newData);
    localStorage.setItem('formFieldsOptions',JSON.stringify(newData));
  }

  updateServiceData(service){
    this.serviceData.next(service);
    localStorage.setItem('serveicesData',JSON.stringify(service));
  }


  getUNDGList(){
    let UNNDL = JSON.parse(localStorage.getItem('arUNDGList'));
    if(!UNNDL){
      UNNDL = JSON.parse(localStorage.getItem('formFieldsOptions'))['arUNDGList'];
    }
    return UNNDL;
  }

  ngOnDestroy() {
    this.stop();
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
    this.storageCollection.complete();
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
      this.storageCollection.next({ key: event.key, value: v });
    }
  }

  putDataInStorage(storageKey: any, storageData: any) {
    localStorage.setItem(storageKey, storageData);
    this.storageCollection.next({ key: storageKey, value: storageData });
  }

  getDataFromStorage(storageKey: any) {
    return localStorage.getItem(storageKey);
  }

  removeDataFromStorage(storageKey: any) {
    return localStorage.removeItem(storageKey);
    this.storageCollection.next({ key: storageKey, value: null });
  }

}
