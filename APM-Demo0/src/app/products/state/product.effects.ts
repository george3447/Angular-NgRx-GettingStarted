import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { ProductService } from "../product.service";
import { ProductActionTypes, Load, LoadSuccess, LoadFail } from "./product.actions";
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
}
