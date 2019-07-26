import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { ProductService } from "../product.service";
import {
  ProductActionTypes, Load, LoadSuccess, LoadFail,
  UpdateProduct, UpdateProductSuccess, UpdateProductFail,
  CreateProduct, CreateProductSuccess, CreateProductFail, DeleteProduct, DeleteProductSuccess, DeleteProductFail
} from "./product.actions";
import { Product } from "../product";


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) { }

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    mergeMap((action: Load) => this.productService.getProducts().pipe(
      map((products: Product[]) => new LoadSuccess(products)),
      catchError((error) => of(new LoadFail(error)))
    ))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.UpdateProduct),
    map((action: UpdateProduct) => action.payload),
    mergeMap((product: Product) => this.productService.updateProduct(product).pipe(
      map((updatedProduct) => (new UpdateProductSuccess(updatedProduct))),
      catchError((error) => of(new UpdateProductFail(error)))
    ))
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.CreateProduct),
    map((action: CreateProduct) => action.payload),
    mergeMap((product: Product) => this.productService.createProduct(product).pipe(
      map((createdProduct) => (new CreateProductSuccess(createdProduct))),
      catchError((error) => of(new CreateProductFail(error)))
    ))
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.DeleteProduct),
    map((action: DeleteProduct) => action.payload),
    mergeMap((productId: number) => this.productService.deleteProduct(productId).pipe(
      map(() => (new DeleteProductSuccess(productId))),
      catchError((error) => of(new DeleteProductFail(error)))
    ))
  );
}
