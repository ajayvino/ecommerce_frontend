import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ShowordersdetailsComponent } from '../showordersdetails/showordersdetails.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-myorders',
  imports: [MatTableModule,MatPaginator,DatePipe,MatButtonModule,MatMenuModule,CurrencyPipe,MatIconModule,RouterLink],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent {

  private service = inject(CustomerService);
  private snackbar=inject(MatSnackBar);
  public dialog = inject(MatDialog);


    ordersList:any;
    displayedColumns: string[] = ['TrackingId','OrderId', 'Amount', 'Description', 'Address','Date','Status','ViewOrder','Action'];
    @ViewChild(MatSort) sort: any;
    @ViewChild(MatPaginator) paginator: any;
    dataSource = new MatTableDataSource<any>();
    showOrder:Boolean=false;
    orderid:any;

  ngAfterViewInit(): void {

    this.getuserorders();


  }

  getuserorders(){
    this.service.getOrdersbyUserid().subscribe({
      next:(res)=>{
        if(res!=null){
          this.ordersList=res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.snackbar.open("Orders Fetched Successfully","Close",{duration:5000});

        }
      }
    })
  }

  showOrderDetails(orderId:number){

    if(this.showOrder){
      this.showOrder=false;
      this.orderid=orderId;
    }
    else{
      this.showOrder=true;
      this.orderid=orderId;
      localStorage.setItem("orderid",this.orderid);
      this.dialog.open(ShowordersdetailsComponent);
      this.showOrder=false;

    }

  }






}
