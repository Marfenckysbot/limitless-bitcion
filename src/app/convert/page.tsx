import React from 'react'
import BTCConvert from '@/components/BTCConvert'

export default function ConvertPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gold-light mb-6">Convert Bitcoin to Cash</h1>
        <BTCConvert />
      </div>
    </div>
  )
}