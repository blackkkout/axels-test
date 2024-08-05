import { request } from './request';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

it('should fetch data successfully', async () => {
  const mockData = { test: 'data' };

  mockFetch.mockResolvedValue(
    new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

  const result = await request('/orders');

  expect(result).toEqual(mockData);
  expect(mockFetch).toHaveBeenCalledWith(
    'https://demo5931952.mockable.io/orders',
    {},
  );
});
