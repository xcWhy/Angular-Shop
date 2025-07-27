import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { NgIf, NgClass } from '@angular/common';
import { ProductsService } from '../../services/products.service'; 

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div class="p-6">
      <button class="text-blue-500 mb-4" (click)="router.navigate(['/'])">
        ← Back
      </button>

      <div *ngIf="product" class="flex flex-col gap-4">
        <img [src]="product.image" class="w-full max-w-md mx-auto" />
        <h1 class="text-2xl font-bold">{{ product.title }}</h1>
        <h1 class="text-lg">{{ product.description }}</h1>
        <p class="text-lg font-semibold">Price: {{ product.price }} lv</p>
        <p class="text-md font-semibold" [ngClass]="{ 'text-green-500': product.stock > 0, 'text-red-500': product.stock === 0 }">
          {{ product.stock > 0 ? (product.stock + ' in stock') : 'Out of stock' }}
        </p>

        <button
          *ngIf="product.stock > 0"
          (click)="cartService.addToCart(product)"
          class="bg-blue-500 text-white p-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>

      <div *ngIf="!product" class="text-red-500">
        Product not found.
      </div>
    </div>
  `,
  styles: [],
})

export class ProductDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  cartService = inject(CartService);
  productsService = inject(ProductsService); 

  product!: Product | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productsService.getProductById(id);
  }
}
