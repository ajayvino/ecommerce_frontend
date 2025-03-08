import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { defaultUrlMatcher } from '@angular/router';


@Component({
  selector: 'app-orders',
  imports: [MatTableModule,MatPaginator,DatePipe,MatButtonModule,MatMenuModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {


  private service= inject(AdminService);
  private snackbar=inject(MatSnackBar);
  ordersList:any;
  displayedColumns: string[] = ['TrackingId','OrderId', 'User Name', 'Amount', 'Description', 'Address','Date','Status','Action','Razorpay Id','Razorpay Signature'];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  dataSource = new MatTableDataSource<any>();


  ngAfterViewInit(): void {

   this.getAllOrders();



  }

  updateStatus(orderid:number,status:string){

    this.service.updateOrderStatus(orderid,status).subscribe({
      next:(res)=>{
        if(res!=null){

          this.snackbar.open("Order Status Updated Successfully","Close",{duration:5000});
          this.getAllOrders();

        }
      },
      error:(err)=>{
        this.snackbar.open("Error Updating Order Status","Error",{duration:5000});
      }
    })
  }

  getAllOrders(){


    this.service.getAllOrders().subscribe({
      next:(res)=>{



        if(res!=null){
         this.ordersList=res;
         this.dataSource = new MatTableDataSource<any>(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.snackbar.open("Orders Fetched Successfully","Close",{duration:5000});

        }
        else{
          this.ordersList=null;

        }
      },

      error:(err)=>{
        this.snackbar.open("Error Fetching Orders","Error",{duration:5000});

      }
    })


  }

}


