import { request } from './request';
import { Order } from '../types/order';
import { ShippingFormValues } from '../components/Shipping';
import { BillingFormValues } from '../components/Billing';
import { PaymentFormValues } from '../components/Payment';

export const getOrders = async () => {
  return request<{ orders: Order[] }>('/orders');
};

export const postShipping = async (data: ShippingFormValues) => {
  return request<{ success: boolean }>(`/shipping`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const postBilling = async (data: BillingFormValues) => {
  return request<{ success: boolean }>(`/billing`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const postPayment = async (data: PaymentFormValues) => {
  return request<{ success: boolean }>(`/payment`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
