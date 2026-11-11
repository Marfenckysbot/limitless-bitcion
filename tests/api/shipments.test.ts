import { test, expect } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/shipments/create/route';

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/shipments/create', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('/api/shipments/create', () => {
  test('does not fabricate a shipment before a provider is configured', async () => {
    const response = await POST(makeRequest({
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
    }));
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.code).toBe('SHIPMENT_PROVIDER_NOT_CONFIGURED');
    expect(data).not.toHaveProperty('shipmentId');
    expect(data).not.toHaveProperty('pickupToken');
  });

  test('validates required fields before reporting the unavailable provider', async () => {
    const response = await POST(makeRequest({}));
    expect(response.status).toBe(400);
  });
});
