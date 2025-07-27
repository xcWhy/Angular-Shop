import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CartService } from '../../../services/cart.service';



@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex gap-4 items-center"
    >
      <img [src]="item().product.image" class="w-[50px] h-[50px] object-contain" />
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ item().product.title }}</span>
        <span class="text-sm">
          {{ item().quantity }} × {{ item().product.price }} lv
        </span>
        <span class="text-sm font-semibold">
          Total: {{ item().quantity * item().product.price }} lv
        </span>
      </div>

<app-button
  label="+"
  (btnClicked)="cartService.addToCart(item().product)"
/>
<app-button
  label="-"
  (btnClicked)="cartService.removeOneFromCart(item().product)"
/>
<app-button
  label="Remove"
  (btnClicked)="cartService.removeFromCart(item().product)"
/>
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  item = input.required<{ product: Product; quantity: number }>();

  cartService = inject(CartService);
}
