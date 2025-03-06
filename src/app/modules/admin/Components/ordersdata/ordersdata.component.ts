import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ordersdata',
  imports: [CurrencyPipe],
  templateUrl: './ordersdata.component.html',
  styleUrl: './ordersdata.component.css'
})
export class OrdersdataComponent {

  @Input() data:any;

}
