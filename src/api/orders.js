import { request } from './request';

export const getOrders = async () => {
  return request('/orders');
};
