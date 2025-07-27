import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

export type CartEntry = {
  product: Product;
  quantity: number;
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart = signal<CartEntry[]>([]);

  cart = this._cart; // expose publicly

  addToCart(product: Product) {
    const current = this._cart();
    const existing = current.find((entry) => entry.product.id === product.id);

    if (existing) {
      this._cart.set(
        current.map((entry) =>
          entry.product.id === product.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      );
    } else {
      this._cart.set([...current, { product, quantity: 1 }]);
    }
  }

  removeOneFromCart(product: Product) {
    const current = this._cart();
    const existing = current.find((entry) => entry.product.id === product.id);

    if (existing) {
      if (existing.quantity === 1) {
        this.removeFromCart(product);
      } else {
        this._cart.set(
          current.map((entry) =>
            entry.product.id === product.id
              ? { ...entry, quantity: entry.quantity - 1 }
              : entry
          )
        );
      }
    }
  }

  removeFromCart(product: Product) {
    this._cart.set(
      this._cart().filter((entry) => entry.product.id !== product.id)
    );
  }

  clearCart() {
  this._cart.set([]);
}
}
