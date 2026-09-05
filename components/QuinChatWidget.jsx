'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getApiBaseUrl } from '@/lib/apiConfig'
import { useStoreHealth } from '@/lib/useStoreHealth'

const DEFAULT_MESSAGES = [
  { 
    role: 'assistant', 
    content: 'Selamat datang di FokusKonten. Saya Sari dari Layanan Pelanggan. Ada yang dapat saya bantu terkait produk atau layanan kami hari ini?' 
  }
]

export default function QuinChatWidget() {
  const { isOffline } = useStoreHealth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(DEFAULT_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load chat history & open state from localStorage
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('fk_chat_history_v2')
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      }
      const savedIsOpen = localStorage.getItem('fk_chat_open_v2')
      if (savedIsOpen === 'true') {
        setIsOpen(true)
      }
    } catch (e) {
      console.warn('Storage read error', e)
    }
    setHasHydrated(true)
  }, [])

  // Save chat history & open state to localStorage
  useEffect(() => {
    if (!hasHydrated) return
    try {
      localStorage.setItem('fk_chat_history_v2', JSON.stringify(messages))
      localStorage.setItem('fk_chat_open_v2', isOpen ? 'true' : 'false')
    } catch (e) {
      console.warn('Storage write error', e)
    }
  }, [messages, isOpen, hasHydrated])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleResetChat = () => {
    setMessages(DEFAULT_MESSAGES)
    try {
      localStorage.removeItem('fk_chat_history_v2')
    } catch (e) {}
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setIsLoading(true)

    try {
      const baseUrl = getApiBaseUrl()
      const aiUrl = baseUrl.endsWith('/api/v1') ? `${baseUrl}/ai/qween` : `${baseUrl}/api/v1/ai/qween`
      const res = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      })
      
      if (!res.ok) throw new Error('AI Server Offline')
      
      const data = await res.json()
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply || 'Maaf, saya sedang memproses jawaban...',
        products: data.products || []
      }])
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Mohon maaf, server konsultasi kami sedang dalam kondisi istirahat/offline sesaat. Anda dapat langsung menghubungi kami melalui menu Hubungi di atas atau WhatsApp resmi kami: 085183011318 🙏' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Render text with clickable markdown links
  const renderMessageContent = (content) => {
    if (typeof content !== 'string') return content

    const regex = /\[(.*?)\]\((.*?)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }
      const linkText = match[1]
      const linkUrl = match[2]
      const isInternal = linkUrl.startsWith('/')

      parts.push(
        isInternal ? (
          <Link 
            key={match.index} 
            href={linkUrl} 
            className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
          >
            {linkText}
          </Link>
        ) : (
          <a 
            key={match.index} 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
          >
            {linkText} ↗
          </a>
        )
      )
      lastIndex = regex.lastIndex
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        return part.split('\n').map((line, lIdx, arr) => (
          <span key={`${idx}-${lIdx}`}>
            {line}
            {lIdx < arr.length - 1 && <br />}
          </span>
        ))
      }
      return part
    })
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neutral-950 text-white shadow-lg shadow-black/35 hover:shadow-2xl hover:shadow-black/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-neutral-800 cursor-pointer ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Tanya Customer Service FokusKonten"
        title="Chat Customer Service Resmi"
      >
        <div className="relative flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950" />
          </span>
        </div>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-5rem)] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 flex flex-col transition-all duration-300 origin-bottom-right font-sans overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-neutral-950 px-4 py-3.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-soft shrink-0">
              <img 
                src="/cs-avatar.png" 
                alt="Sari - Layanan Pelanggan" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-sm tracking-tight">Sari — Layanan Pelanggan</h3>
              </div>
              {isOffline ? (
                <p className="text-amber-400 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Mode Offline • Server Istirahat
                </p>
              ) : (
                <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • FokusKonten Support Resmi
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              onClick={handleResetChat} 
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Mulai Percakapan Baru"
              title="Mulai Percakapan Baru"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup Chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-50/70 text-xs sm:text-sm">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-xs mt-0.5">
                  <img 
                    src="/cs-avatar.png" 
                    alt="Sari" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${msg.role === 'user' ? 'bg-neutral-950 text-white rounded-tr-none shadow-soft' : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-tl-none shadow-sm'}`}>
                <div className="whitespace-pre-wrap">
                  {renderMessageContent(msg.content)}
                </div>

                {/* Lampiran Kartu Produk Ready di Web */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-neutral-200/80 space-y-1.5">
                    <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase flex items-center gap-1">
                      <span>🛒</span> Produk Ready di Web:
                    </div>
                    <div className="space-y-1.5">
                      {msg.products.map((prod) => (
                        <Link
                          key={prod.sku}
                          href={prod.url || `/toko-digital/${prod.sku}`}
                          className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 hover:bg-blue-50 border border-neutral-200 hover:border-blue-300 transition-all group block text-left"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-semibold text-xs text-neutral-900 group-hover:text-blue-700 truncate">
                              {prod.title}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              SKU: {prod.sku} • Format: <span className="font-medium text-neutral-700">{prod.format}</span>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 group-hover:bg-emerald-100">
                              Rp {Number(prod.price).toLocaleString('id-ID')} ↗
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-start justify-start">
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-xs mt-0.5">
                <img 
                  src="/cs-avatar.png" 
                  alt="Sari" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white border border-neutral-200/90 rounded-2xl rounded-tl-none p-3 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-neutral-200/80">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan seputar produk, aplikasi, atau pesanan..."
              className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-neutral-100/80 border border-neutral-200 focus:border-neutral-950 focus:bg-white focus:ring-1 focus:ring-neutral-950 text-xs sm:text-sm outline-none transition-all placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer shadow-soft"
              aria-label="Kirim Pesan"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
