import { Component, OnInit, OnDestroy } from '@angular/core';
import { foodItem , User} from '../interfaces';
import { FoodService, AuthenticationService, CartService } from '../services';
import { Subscription } from '../../../node_modules/rxjs';
import { first } from '../../../node_modules/rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-food-item',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit, OnDestroy {

  public currentUser: User;
  public foodItems: foodItem[];
  public selectedFoodItem: any;
  public foodItemList: any[] = [];
  public errorItem: boolean = false;
  public currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private foodService: FoodService,
    private CartService: CartService,
    private router:Router
  ) {
   
   
   }


  public ngOnInit(): void {
    this.loadAllFoodItems();
  }

  public ngOnDestroy():void {
    // unsubscribe to ensure no memory leaks
    if(this.currentUserSubscription){
      this.currentUserSubscription.unsubscribe();
    }
}


  public total(): void {
    return this.foodItemList.reduce((total, item) => total + item.cost, 0);

  }

  private loadAllFoodItems() {
        this.foodService.getAllFoodItems().pipe(first()).subscribe(items=> {
            this.foodItems = items;
        });
        
    }

  public addToCart(item):void {
    if (this.foodItemList.indexOf(item) === -1) {
      this.foodItemList.push(item);
      this.CartService.setCartwithItems( this.foodItemList)
      this.errorItem = false;
    }
    else if (this.foodItemList.indexOf(item) > -1) {
      this.errorItem = true;
    }
  }



  public removeItem(item):void {
    var index = this.foodItemList.indexOf(item);
    if (index > -1) {
      this.foodItemList.splice(index, 1);
    }
  }


}
