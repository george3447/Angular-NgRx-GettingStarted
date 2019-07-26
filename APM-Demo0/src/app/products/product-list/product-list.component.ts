import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {

  pageTitle = 'Products';

  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() currentProduct: Product | null;
  @Input() errorMessage: string;

  @Output() showProductCode = new EventEmitter<boolean>();
  @Output() addProduct = new EventEmitter<null>();
  @Output() selectProduct = new EventEmitter<Product>();
  constructor() { }

  checkChanged(value: boolean): void {
    this.showProductCode.emit(value);
  }

  newProduct(): void {
    this.addProduct.emit();
  }

  productSelected(product: Product): void {
    this.selectProduct.emit(product);
  }

}
