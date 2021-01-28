import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  qunatity = 1;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketSerice: BasketService) 
  {
      this.bcService.set('@productDetails', "");
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketSerice.addItemToBasket(this.product, this.qunatity);
  }

  incrementQuantity() {
    this.qunatity++;
  }

  decrementQuantity() {
    if (this.qunatity > 1) {
      this.qunatity--;
    }
    
  }

  loadProduct() {
    this.shopService.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(Product => {
      this.product = Product;
      this.bcService.set('@productDetails', this.product.name)
    },
    error => {
      console.log(error);
    })
  }

}
