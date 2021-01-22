import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/interface/product';
import { IPagination } from '../shared/interface/pagination';
import { IBrand } from '../shared/interface/brand';
import { IProductTypes } from '../shared/interface/productTypes';
import { ShopParams } from '../shared/interface/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef; // static is u
  products: IProduct[];
  productBrands: IBrand[];
  productTypes: IProductTypes[];
  totalCount: number;

  shopParams: ShopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductByBrands();
    this.getProductByTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (res: IPagination) => {
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductByBrands() {
    this.shopService.getProductByBrands().subscribe(
      (res: IBrand[]) => {
        this.productBrands = [{ id: 0, name: 'All' }, ...res];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductByTypes() {
    this.shopService.getProductByTypes().subscribe(
      (res: IProductTypes[]) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...res];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanges(pageNumber: number) {
    if (this.shopParams.pageNumber != pageNumber) {
      this.shopParams.pageNumber = pageNumber;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
