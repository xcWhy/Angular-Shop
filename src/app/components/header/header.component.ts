import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, FormsModule],
  template: `
    <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-center gap-4"
    >
      <button class="text-2xl" routerLink="/">My Store :3</button>

      <input
        type="text"
        class="border p-2 rounded"
        placeholder="Search products..."
        [ngModel]="productsService.searchQuery()"
        (ngModelChange)="productsService.setSearchQuery($event)"
      />

      <app-primary-button label="{{ cartLabel() }}" routerLink="/cart" />
    </div>
  `,
})
export class HeaderComponent {
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  cartLabel = computed(() => {
  const totalItems = this.cartService.cart().reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return `Cart (${totalItems})`;
});
}
