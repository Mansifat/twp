import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.email) {
      setStatus('error')
      setErrorMsg('Email is required.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    const { error } = await supabase.from('leads').insert({
      first_name: form.firstName || null,
      last_name: form.lastName || null,
      email: form.email,
      topic: form.topic || null,
      message: form.message || null,
      source: 'contact_form',
    })

    if (error) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
      console.error('Lead submission failed:', error)
      return
    }

    setStatus('success')
    setForm({ firstName: '', lastName: '', email: '', topic: '', message: '' })
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3"></p>
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            Let's Build
            <br />
            <span className="text-gold">Together</span>
          </h1>
          <p className="mt-6 text-cream/60 text-lg">
            Whether you're a customer, investor, or just have a question —
            we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Contact</p>
            <h2 className="section-title mb-6">Send Us a Message</h2>
            <p className="text-jet-light/70 leading-relaxed mb-8">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            {status === 'success' ? (
              <div className="border border-gold/40 bg-gold/5 px-6 py-8 text-center">
                <p className="text-charcoal font-semibold">Message sent — thank you!</p>
                <p className="text-jet-light/70 text-sm mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full bg-white border border-gold/20 px-4 py-3 text-charcoal placeholder:text-jet-light/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full bg-white border border-gold/20 px-4 py-3 text-charcoal placeholder:text-jet-light/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white border border-gold/20 px-4 py-3 text-charcoal placeholder:text-jet-light/40 focus:outline-none focus:border-gold transition-colors"
                />
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full bg-white border border-gold/20 px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Partnerships</option>
                  <option>Investors</option>
                  <option>Press & Media</option>
                </select>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full bg-white border border-gold/20 px-4 py-3 text-charcoal placeholder:text-jet-light/40 focus:outline-none focus:border-gold transition-colors resize-none"
                />

                {status === 'error' && (
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="md:pl-12 md:border-l border-gold/20">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Info</p>
            <h2 className="section-title mb-6">Other Ways to Reach Us</h2>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1">Email</h4>
                <p className="text-jet-light/70">hello@SOVEREIGN.com</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1">Social</h4>
                <div className="flex flex-col gap-1 text-jet-light/70">
                  <span>@SOVEREIGN — Instagram / TikTok</span>
                  <span>@SOVEREIGN — X / Twitter</span>
                  <span>SOVEREIGN — YouTube</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1">Founding Member Waitlist</h4>
                <p className="text-jet-light/70">
                  Get early access, exclusive drops, and founder-level pricing.
                  Use the form or email <span className="text-gold">founders@SOVEREIGN.com</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
