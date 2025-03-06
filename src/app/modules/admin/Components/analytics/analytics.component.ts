import { Component, inject } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import { OrdersdataComponent } from "../ordersdata/ordersdata.component";

@Component({
  selector: 'app-analytics',
  imports: [OrdersdataComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  private service = inject(AdminService);

  analytics:any=[];

  ngOnInit(): void {

    this.service.getAllAnalytics().subscribe({
      next:(res)=>{

        this.analytics=res;
        console.log(this.analytics);


      }
    })

  }


}
