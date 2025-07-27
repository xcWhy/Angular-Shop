import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>

      <form [formGroup]="checkoutForm" (ngSubmit)="submitOrder()">
        <div class="mb-4">
          <label class="block font-semibold">Names</label>
          <input formControlName="name" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Adderss</label>
          <input formControlName="address" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Phone number</label>
          <input formControlName="phone" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Payment method</label>
          <select formControlName="paymentMethod" class="w-full p-2 border rounded" required>
            <option value="cash">Card</option>
            <option value="card">Cash</option>
          </select>
        </div>

        <button
          type="submit"
          [disabled]="checkoutForm.invalid"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit checkout
        </button>
      </form>

    </div>
  `,
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    paymentMethod: ['cash', Validators.required],
  });

  submitOrder() {
  if (this.checkoutForm.invalid) return;

  const orderDetails = {
    user: this.checkoutForm.value,
    items: this.cartService.cart(),
  };

  console.log('📦 Order Submitted:', orderDetails);

  // Simulate stock update
  this.cartService.cart().forEach(item => {
    if (item.product.stock !== undefined) {
      item.product.stock -= item.quantity;
    }
  });

  this.cartService.clearCart();
  
  window.alert('We got your order! Thank you for your purchase! :D');

  
  this.router.navigate(['/']);
}
}
