import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent, RouterModule],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total:</span>
          <span class="text-lg font-bold">{{ total() + ' lv' }}</span>
        </div>
        <app-primary-button 
        label="Proceed to checkout" 
        [routerLink]="['/checkout']"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  total = computed(() => {
    return this.cartService.cart().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  });
}
