import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, foodItem} from '../interfaces'

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart:foodItem[]=[];
    constructor(private http: HttpClient) { }

    setCartwithItems(foodItems) {
       this.cart = foodItems;
    }

    getCartItems(){
        return this.cart;
    }


}