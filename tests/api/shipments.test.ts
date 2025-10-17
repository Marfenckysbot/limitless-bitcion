import { test, expect } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/shipments/create/route';

describe('/api/shipments/create', () => {
  test('creates shipping quote successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userId: 'test-user',
        items: [{
          type: 'JEWELRY',
          description: 'Test item'
        }],
        declaredValue: 1000,
        tier: 'STANDARD',
        pickupWindow: new Date().toISOString(),
        kycId: 'test-kyc',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zip: '12345',
          country: 'United States'
        }
      }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('shipmentId');
    expect(data).toHaveProperty('quote');
    expect(data.quote).toHaveProperty('baseFee');
    expect(data.quote.baseFee).toBeGreaterThanOrEqual(25);
  });

  test('validates required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {}
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});