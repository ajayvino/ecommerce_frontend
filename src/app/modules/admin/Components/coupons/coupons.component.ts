import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import {MatTooltip} from '@angular/material/tooltip';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-coupons',
  imports: [MatButtonModule,MatTableModule, MatPaginatorModule,MatSortModule,MatInputModule,DatePipe],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent implements AfterViewInit {

  couponsList:any=[];
  private service = inject(AdminService);
  displayedColumns: string[] = ['id', 'name', 'code', 'discount', 'expirationdate'];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  dataSource = new MatTableDataSource<any>();



  ngAfterViewInit(): void {
    this.getCoupons();

  }


  getCoupons(){

    this.service.getAllCoupons().subscribe({
      next:(res)=>{
        this.couponsList=res;
        console.log(this.couponsList);

    this.dataSource = new MatTableDataSource<any>(res);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;

      },
      error:(err)=>{
        console.log(err);

      }
    })

  }
}
