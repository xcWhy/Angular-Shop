import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl">Shopping cart</h2>

      @for (entry of cartService.cart(); track entry.product.id) {
        <app-cart-item [item]="entry" />
      }

      <app-order-summary />
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartService);
}
