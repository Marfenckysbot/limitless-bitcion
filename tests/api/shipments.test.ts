import { test, expect } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/shipments/create/route';

describe('/api/shipments/create', () => {
  test('does not fabricate a shipment before a provider is configured', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        userId: 'test-user',
        items: [{ type: 'JEWELRY', description: 'Test item' }],
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

    const response = await POST(req as any);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.code).toBe('SHIPMENT_PROVIDER_NOT_CONFIGURED');
    expect(data).not.toHaveProperty('shipmentId');
    expect(data).not.toHaveProperty('pickupToken');
  });

  test('validates required fields before reporting the unavailable provider', async () => {
    const { req } = createMocks({ method: 'POST', body: {} });
    const response = await POST(req as any);
    expect(response.status).toBe(400);
  });
});
