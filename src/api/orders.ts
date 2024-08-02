import { request } from './request';
import { Order } from '../types/order';

export const fetchOrders = async () => {
  return request<{ orders: Order[] }>('/orders');
};
