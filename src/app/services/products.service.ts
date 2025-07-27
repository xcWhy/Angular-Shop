import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model'; // assume you've moved the type

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _products = signal<Product[]>([
    {
      id: 1,
      title: 'Devin Water',
      price: 5,
      image: '../../devin_water.jpg',
      stock: 10,
      description: 'This bottle of water is really good. The water inside it is top tier.',
    },
    {
      id: 2,
      title: 'Stickers',
      price: 10,
      image: '../../cat_stickers.jpg',
      stock: 15,
      description: 'These stickers are made for people who love cats. They are really good quality and waterproof!',
    },
    {
      id: 3,
      title: 'Glass Water Bottle',
      price: 20,
      image: '../../glass_bottle.jpg',
      stock: 5,
      description: 'This glass water bottle does not need to be cleaned every single time after being used. It has speial functions which clears itself. But after the third use, we would recommend to be cleaned with boiling hot water.',
    },
    {
      id: 4,
      title: 'Radeon 560 RX Series',
      price: 200,
      image: '../../radeon.jpg',
      stock: 7,
      description: 'This is a really olg GPU card. It is still working.',
    },
    {
      id: 5,
      title: 'Sandy Pet Cat',
      price: 10000000000,
      image: '../../KotkaSandy.jpg',
      stock: 0,
      description: 'This is the best cat.',
    },
    {
      id: 6,
      title: 'White Shoes',
      price: 45,
      image: '../../white_shoes.jpg',
      stock: 7,
      description: 'These shoes are cool. They will make the person wearing them x 10 times cooler.',
    },
    {
      id: 7,
      title: 'Black Keychain',
      price: 7,
      image: '../../keychain.jpg',
      stock: 7,
      description: 'This keychain is handmade. It is really cute and really worth it.',
    },
    {
      id: 8,
      title: 'Roblox carpet',
      price: 22,
      image: '../../roblox_carpet.jpg',
      stock: 12,
      description: 'This carpet is fluffy and teleports you to unique places.',
    },
  ]);

  searchQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this._products();
    return this._products().filter(product =>
      product.title.toLowerCase().startsWith(query)
    );
  });

  getProducts = () => this.filteredProducts;

    setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }


  getAllProducts = () => this._products;
  getProductById = (id: number) => this._products().find(p => p.id === id);

}
