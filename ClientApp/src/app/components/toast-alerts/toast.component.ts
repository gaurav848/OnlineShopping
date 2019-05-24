import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ToasterService } from '@app/services/index'; 
import { IToast} from '@app/models/index';
import { HostListener} from "@angular/core";


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: IToast[] = [];
  
  public topValue= 0; 
  constructor(private toastService: ToasterService) { }

  ngOnInit(): void {
    //this.topValue = window.top.screenY;
    this.toastService.getToast().subscribe((toast: IToast) => {
      if (!toast) {
        // clear toasts when an empty toast is received
        this.toasts = [];
        return;
      }

      // To find if the same msg Toast already displayed.
      // if found then remove it from the list, 
      // so as the new same msg toast can be added in list 
      // and thus displayed on UI.
      // for( var i = 0; i < this.toasts.length; i++){ 
      //   if ( this.toasts[i].message === toast.message) {
      //     this.toasts.splice(i, 1);
      //   }
      // }

      
      this.toasts.push(toast);
     
      setTimeout(() => this.removeToast(toast), 6000);
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
     this.topValue = window.pageYOffset;
    //console.log('Top value: ' + this.topValue);
  }

 
  removeToast(toast: IToast): void {
    this.toasts = this.toasts.filter(x => x !== toast);
  }
}
