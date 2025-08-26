import { api } from './api';
import type { Product } from '../types';
import type { ApiResponse, PaginatedResponse } from '../types/api';

export const productService = {
  async getProducts(page = 0, size = 10): Promise<PaginatedResponse<Product>> {
    const response = await api.get<PaginatedResponse<Product>>('/products', {
      params: { page, size }
    });
    return response.data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/products/featured');
    return response.data.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  async searchProducts(query: string, page = 0, size = 10): Promise<PaginatedResponse<Product>> {
    const response = await api.get<PaginatedResponse<Product>>('/products/search', {
      params: { query, page, size }
    });
    return response.data;
  },

  async getProductsByCategory(category: string, page = 0, size = 10): Promise<PaginatedResponse<Product>> {
    const response = await api.get<PaginatedResponse<Product>>(`/products/category/${category}`, {
      params: { page, size }
    });
    return response.data;
  }
};
