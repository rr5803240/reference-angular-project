import { Component, OnInit, Input } from '@angular/core';
import { foodItem } from '../../interfaces';
import { CartService, AuthenticationService, AlertService } from '../../services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems: foodItem[] = [];
  public errorItem: boolean = false;
  constructor(
    private CartService: CartService, 
    private router: Router, 
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {

  }

  public ngOnInit(): void {

    this.cartItems = this.CartService.getCartItems();
  }

  public total(): number {
    return this.cartItems.reduce((total, item) => total + item.cost, 0);

  }


  public addToCart(item): void {
    if (this.cartItems.indexOf(item) === -1) {
      this.cartItems.push(item);
      this.errorItem = false;
    }
    else if (this.cartItems.indexOf(item) > -1) {
      this.errorItem = true;
    }
  }

  public placeOrder(): void {
    this.CartService.placeOrder(this.cartItems).subscribe(
      data => {
        this.alertService.success('Order Placed SuccessFully', true);
        this.router.navigate(['/home/track-order']);
        this.CartService.emptyCart();
      },
      error => {
        this.alertService.error(error);
      });
  }


  public removeItem(item): void {
    var index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
