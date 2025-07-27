import { Component, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  standalone: true,
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-screen-xl mx-auto place-items-center">

      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
      @if (products().length === 0) {
        <p>No products like that yet!</p>
      }
    </div>
  `,
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  products = this.productsService.getProducts(); 
}
