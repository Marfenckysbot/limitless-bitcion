declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    DATABASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    STRIPE_SECRET_KEY: string
    COINBASE_API_KEY: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    HMAC_SECRET: string
  }
}

interface ShippingQuote {
  shipmentId: string
  quote: {
    baseFee: number
    percentFee: number
    percentFeeAmount: number
    sameDaySurcharge: number
    insuranceDeductible: number
    total: number
    currency: string
  }
  pickupToken: string
  expiresAt: string
}

interface BTCQuote {
  quoteId: string
  btcRate: number
  feePercent: number
  feeAmount: number
  fiatAmount: number
  currency: string
  expiresAt: string
  requiredConfirmations: number
}

interface ShippingTier {
  id: string
  name: string
  description: string
  features: string[]
}

interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

interface ShipmentEvent {
  ts: string
  type: string
  lat: number
  long: number
  note: string
}

interface ShipmentStatus {
  shipmentId: string
  status: string
  courier: {
    id: string
    name: string
    eta: string
  }
  trackingEvents: ShipmentEvent[]
}

interface KYCSession {
  kycSessionId: string
  requiredDocs: string[]
}