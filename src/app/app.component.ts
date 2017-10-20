import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Angular Demo';
  currentUrl = "";

  constructor(private router: Router){

    this.router.events.subscribe(ev => {
      console.log("Router event: ", ev);
      if (ev instanceof NavigationEnd)
        this.currentUrl = ev.url;
    });
  }

  public logout(){
    console.log("Does'nt do anything right now!");
  }

}
