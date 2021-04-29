import { Component, OnInit, OnDestroy } from '@angular/core';
import { foodItem , User} from '../../interfaces';
import { FoodService, AuthenticationService, CartService, AlertService } from '../../services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  public searchText:string = '';
  public currentUserSubscription: Subscription;
  public foodItemTobeAddedInCart:foodItem ={} as foodItem;
  constructor(
    private alertService: AlertService,
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
    this.foodItemTobeAddedInCart = item;
  }

  public confirmCart():void{
    if (this.foodItemList.indexOf(this.foodItemTobeAddedInCart) === -1) {
      this.foodItemList.push(this.foodItemTobeAddedInCart);
    
      this.errorItem = false;
      
    }
    else if (this.foodItemList.indexOf(this.foodItemTobeAddedInCart) > -1) {
      this.errorItem = true;
    }
    this.CartService.setCartwithItems( this.foodItemList)
  }

  public placeOrder():void{
    this.CartService.placeOrder([this.foodItemTobeAddedInCart]).subscribe(
      data => {
        this.alertService.success('Order Placed SuccessFully', true);
        this.router.navigate(['/home/track-order']);
        this.CartService.emptyCart();
      },
      error => {
          this.alertService.error(error);
      });
  }



  public removeItem(item):void {
    var index = this.foodItemList.indexOf(item);
    if (index > -1) {
      this.foodItemList.splice(index, 1);
    }
  }


}
