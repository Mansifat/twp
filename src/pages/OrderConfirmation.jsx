import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const PAYMENT_LABELS = {
  cash: 'Cash on Delivery',
  upi: 'UPI',
  card: 'Card',
  netbanking: 'Net Banking',
}

export default function OrderConfirmation() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(Boolean(orderId))

  useEffect(() => {
    if (!orderId) return

    async function load() {
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from('orders').select('*').eq('id', orderId).single(),
        supabase.from('order_items').select('*').eq('order_id', orderId),
      ])

      if (!orderRes.error) setOrder(orderRes.data)
      if (!itemsRes.error) setItems(itemsRes.data)
      setLoading(false)
    }

    load()
  }, [orderId])

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-24">
        <div className="text-gold text-5xl mb-6">✓</div>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-serif mb-4">
          Order Confirmed
        </h1>

        {loading ? (
          <p className="text-jet-light/50">Loading order details...</p>
        ) : order ? (
          <div className="text-left bg-white border border-gold/20 p-6 mt-6 space-y-3">
            <Row label="Order Reference" value={order.order_reference} mono />
            <Row label="Name" value={order.customer_name} />
            <Row label="Phone" value={order.customer_phone} />
            <Row label="Payment Method" value={PAYMENT_LABELS[order.payment_method] || order.payment_method} />
            <Row label="Total" value={formatPrice(order.subtotal_cents)} />

            {items.length > 0 && (
              <div className="pt-3 border-t border-gold/10">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-jet-light/70 py-1">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>{formatPrice(item.price_cents * item.quantity)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-jet-light/70">
            Thank you for your order. A confirmation has been recorded.
          </p>
        )}

        <Link to="/products" className="btn-primary inline-block mt-8">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

function Row({ label, value, mono }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-jet-light/50">{label}</span>
      <span className={`text-charcoal font-medium ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}

function formatPrice(cents) {
  return '₹' + (cents / 100).toLocaleString('en-IN')
}
