import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IToast } from '@app/models/index';

//https://medium.com/@feihafferkamp/how-to-add-a-toaster-notification-to-an-angular-6-application-225c77f9eb94
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private subject = new Subject<IToast>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
   
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } 
        else {
          this.clear();
        }

      }
    });

  }

  toast(message: string, cssClassName: string = 'alert-success', keepAfterRouteChange = true): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<IToast>{ message: message, CSSClassName: cssClassName });
  }

  clear() {
    this.subject.next();
  }

  getToast(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message, keepAfterRouteChange = true): void {
    this.toast(message,'alert-success', keepAfterRouteChange,);
  }

  error(message, keepAfterRouteChange = true): void {
    this.toast(message,'alert-danger', keepAfterRouteChange, );
  }

  info(message: string, keepAfterRouteChange = true): void {
    this.toast(message,'alert-info', keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = true): void {
    this.toast(message,'alert-warning', keepAfterRouteChange);
  }



}