import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';


@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot() // for root is added for singletons - PM is singleton has its own providers that needed to be loaded at root.
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent
  ]
})
export class SharedModule { }
