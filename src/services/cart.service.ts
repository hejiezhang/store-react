import { api } from './api';
import type { CartItem } from '../types';
import type { ApiResponse } from '../types/api';

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const response = await api.get<ApiResponse<CartItem[]>>('/cart');
    return response.data.data;
  },

  async addToCart(productId: number, quantity: number): Promise<CartItem> {
    const response = await api.post<ApiResponse<CartItem>>('/cart', {
      productId,
      quantity
    });
    return response.data.data;
  },

  async updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
    const response = await api.put<ApiResponse<CartItem>>(`/cart/${itemId}`, {
      quantity
    });
    return response.data.data;
  },

  async removeFromCart(itemId: number): Promise<void> {
    await api.delete(`/cart/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  }
};
