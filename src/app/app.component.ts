import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,MatIconModule,MatToolbarModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce_frontend';
  isAdminLoggedIn:boolean=LocalstorageService.isAdminLoggedIn();
  isEmployeeLoggedIn:boolean=LocalstorageService.isEmployeeLoggedIn();
  private router=inject(Router);

  ngOnInit(): void {

    this.router.events.subscribe(event=>{
    this.isAdminLoggedIn=LocalstorageService.isAdminLoggedIn();
    this.isEmployeeLoggedIn=LocalstorageService.isEmployeeLoggedIn();
      })

    }

    logout(){
      LocalstorageService.signout();
      this.router.navigateByUrl("/login");
    }

}
