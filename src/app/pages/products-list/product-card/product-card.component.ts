import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative w-[250px] aspect-square overflow-hidden"
    >
      <div (click)="goToDetails()" class="cursor-pointer">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ product().title }}</span>
        <span class="text-sm"> {{ product().price + ' lv' }}</span>
        @if (product().stock && product().stock > 0) {
        <app-primary-button
          (btnClicked)="cartService.addToCart(product())"
          class="mt-3"
          label="Add to Cart"
        />
        }
      </div>

        <span
          class="absolute top-2 right-3 text-sm font-bold"
          [class.text-green-500]="product().stock > 0"
          [class.text-red-500]="!product().stock || product().stock === 0"
        >
        @if (product().stock) {
        {{ product().stock }} left } @else { Out of stock }
      </span>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);
  router = inject(Router);

  product = input.required<Product>();

  goToDetails() {
    this.router.navigate(['/product', this.product().id]);
  }
}
