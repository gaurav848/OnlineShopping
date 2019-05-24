import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce Platform';

  public update : boolean = false;
  public joke : any = '';

  /**
   *
   */
  constructor(updates: SwUpdate, private http: HttpClient) {
  updates.available.subscribe(event => {
    //this.update = true;
    updates.activateUpdate().then(()=> document.location.reload());

  })    

   
    
  }

  ngOnInit() {
    this.getData().subscribe(res=> {
      this.joke = res;
    })
  }

  getData() {
    return this.http.get('https://api.chucknorris.io/jokes/random');

  }
}
