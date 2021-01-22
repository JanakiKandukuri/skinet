import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/interface/pagination';
import { IBrand } from '../shared/interface/brand';
import { IProductTypes } from '../shared/interface/productTypes';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/interface/shopParams';

@Injectable({
  providedIn: 'root', //meaning provided in root (app-module). services are singletons meaning they are always available as long as our app is available.
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams?: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId != 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId != 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search) {
      params = params.append('search', shopParams.search);
    }

      params = params.append('sort', shopParams.sort);
      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageSize', shopParams.pageSize.toString())


    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params}) // because of observe our response is what we are returning to make it IPagination we usee rxjs pipe and map.
            .pipe( //wrapper for rxjs operators.
              map(response => { //map is used to map our http response to IPagination.
                return response.body;
              })
            )
  }

  getProductByBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getProductByTypes() {
    return this.http.get<IProductTypes[]>(this.baseUrl + 'products/types');
  }
}
