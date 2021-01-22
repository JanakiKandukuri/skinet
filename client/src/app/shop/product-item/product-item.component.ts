import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

}
