import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { Product } from '../product';
import * as fromProduct from '../state/product.reducer';
import { ToggleProductCode, InitializeCurrentProduct, SetCurrentProduct, Load } from '../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  displayCode: boolean;
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct))
      .pipe(untilDestroyed(this))
      .subscribe(
        currentProduct => this.selectedProduct = currentProduct
      );

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store.pipe(select(fromProduct.getShowProductCode))
      .pipe(untilDestroyed(this))
      .subscribe(
        showProductCode => { this.displayCode = showProductCode; });
  }

  ngOnDestroy(): void {
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

}
