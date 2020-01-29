import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Injectable()
export class TypeAheadService {

    Http: HttpClient;
    BaseURL: string;
    Headers: any;
    product: any;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.Http = http;
        this.BaseURL = baseUrl;
        this.Headers = new Headers();
        this.Headers.append('Content-Type', 'application/json');
    }

    search(query) {
        var listOfProducts = this.Http.get(this.BaseURL + 'product/getProduct?' + query)
            .pipe(
                debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
                map(
                    (data: any) => {
                        return (
                            data.length != 0 ? data as any[] : [{ "Product": "No Record Found" } as any]
                        );
                    }
                ));

        return listOfProducts;
    }

    getProductById(prodID) {
        this.Http.get<any>(this.BaseURL + 'product/getProduct/' + prodID).subscribe(result => {
            this.product = result;
          }, error => console.error(error));
          return this.product;
    }
    
}