import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../product';
import * as fromProduct from '../state/product.reducer';
import {
  ToggleProductCode, InitializeCurrentProduct, SetCurrentProduct,
  Load, CreateProduct, UpdateProduct, DeleteProduct, ClearCurrentProduct
} from '../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit, OnDestroy {

  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  currentProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new Load());

    this.currentProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  ngOnDestroy(): void {
  }

  showProductCode(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  addProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  selectProduct(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

  create(product: Product): void {
    this.store.dispatch(new CreateProduct(product));
  }
  update(product: Product): void {
    this.store.dispatch(new UpdateProduct(product));
  }
  delete(productId: number): void {
    this.store.dispatch(new DeleteProduct(productId));
  }
  clearCurrent(): void {
    this.store.dispatch(new ClearCurrentProduct());
  }
}
