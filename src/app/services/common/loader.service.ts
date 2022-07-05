import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);

  public loadingCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.isLoading.subscribe((v) => {
      if (v) {
        let currLoadingCount = this.loadingCount.getValue();
        this.loadingCount.next(++currLoadingCount);
      } else {
        let currLoadingCount = this.loadingCount.getValue();
        if (currLoadingCount === 0) {
          this.loadingCount.next(0);
        } else {
          this.loadingCount.next(--currLoadingCount);
        }
      }
    });
  }

  hideLoader() {
    this.loadingCount.next(0);
  }
  
}

// Loader sample
// https://www.freakyjolly.com/http-global-loader-progress-bar-using-angular-interceptors/#.YAagT5MzZO8