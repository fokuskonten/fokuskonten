'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const tabs = [
  { id: 'kursus', label: 'Kursus' },
  { id: 'presets', label: 'Presets Lightroom' },
  { id: 'kaila-mebel', label: 'Kaila Mebel' },
  { id: 'template-blogger', label: 'Template Blogger' },
  { id: 'aset-digital', label: 'Aset Digital' },
]

const tabContent = {
  'kursus': {
    title: 'Kursus Video Tutorial',
    description: 'Kursus video tutorial berkualitas untuk meningkatkan skill Anda di bidang editing video, perakitan PC, dan pengembangan toko online.',
    items: [
      {
        name: 'Kursus Premiere Pro',
        description: 'Belajar editing video profesional menggunakan Adobe Premiere Pro dari dasar hingga mahir. Cocok untuk content creator, videografer, dan pemula.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Kursus%20Premiere%20Pro',
      },
      {
        name: 'Kursus Rakit PC',
        description: 'Panduan lengkap merakit komputer dari nol. Pelajari komponen, perakitan, instalasi OS, hingga troubleshooting.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Kursus%20Rakit%20PC',
      },
      {
        name: 'Kursus Toko Online',
        description: 'Cara membuat dan mengelola toko online sendiri. Dari pemilihan platform, desain, hingga strategi pemasaran.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Kursus%20Toko%20Online',
      },
      {
        name: 'Kursus Web & Mobile Development',
        description: 'Kursus baru: React, Django, Laravel, Vue.js, dan React Native. Bangun website dan aplikasi modern dari dasar hingga deployment.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Kursus%20Web%20%26%20Mobile%20Development',
        badge: 'Baru',
      },
    ],
  },
  'presets': {
    title: 'Presets Lightroom',
    description: 'Koleksi 110+ preset Lightroom siap pakai untuk berbagai gaya editing foto. Dari cinematic, vintage, natural, hingga aesthetic.',
    items: [
      {
        name: 'Preset Cinematic Bundle',
        description: '50+ preset gaya film dan cinematic untuk foto portrait, landscape, dan street photography.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20Preset%20Cinematic%20Bundle',
      },
      {
        name: 'Preset Vintage & Film',
        description: '30+ preset vintage, film look, dan retro untuk tampilan foto klasik yang timeless.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20Preset%20Vintage%20%26%20Film',
      },
      {
        name: 'Preset Natural & Aesthetic',
        description: '30+ preset natural dengan tone earthy, soft, dan aesthetic untuk foto sehari-hari.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20Preset%20Natural%20%26%20Aesthetic',
      },
    ],
  },
  'kaila-mebel': {
    title: 'Kaila Mebel — Kerajinan Kayu',
    description: 'Kerajinan tangan berkualitas dari kayu pinus pilihan. Setiap produk dibuat dengan sentuhan handmade yang unik dan elegan.',
    items: [
      {
        name: 'Organizer Meja',
        description: 'Organizer meja multifungsi dari kayu pinus. Cocok untuk menyimpan alat tulis, hp, dan aksesori meja. Ukuran 20x15x10 cm.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20memesan%20Organizer%20Meja',
      },
      {
        name: 'Asbak Kayu',
        description: 'Asbak handmade dari kayu pinus dengan desain minimalis dan finishing halus. Tersedia berbagai ukuran.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20memesan%20Asbak%20Kayu',
      },
      {
        name: 'Tempat Lollipop',
        description: 'Wadah lollipop unik dari kayu, cocok untuk dekorasi toko, hadiah, atau display produk.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20memesan%20Tempat%20Lollipop',
      },
      {
        name: 'Bangku / Meja Custom',
        description: 'Bangku dan meja custom sesuai ukuran dan desain yang Anda inginkan. Kayu pinus berkualitas, finishing rapi.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20konsultasi%20pemesanan%20Bangku%20Meja%20Custom',
      },
    ],
  },
  'template-blogger': {
    title: 'Template Blogger',
    description: 'Template Blogger modern dan profesional. SEO friendly, mobile first, dengan dukungan dark mode dan loading super cepat.',
    items: [
      {
        name: 'FokusKonten Theme v1.2.0',
        description: 'Template Blogger premium FokusKonten dengan desain modern, SEO optimized, dark mode, dan fitur lengkap. Cocok untuk blog personal, teknologi, dan berita.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20FokusKonten%20Theme%20v1.2.0',
        badge: 'Populer',
      },
      {
        name: 'Portfolio Theme',
        description: 'Template Blogger khusus portofolio dengan galeri grid, halaman about, dan contact form. Cocok untuk kreator, desainer, dan fotografer.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20Portfolio%20Theme',
      },
      {
        name: 'Toko Online Theme',
        description: 'Template Blogger untuk toko online sederhana. Dilengkapi katalog produk, keranjang, dan integrasi WhatsApp order.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20ingin%20membeli%20Toko%20Online%20Theme',
      },
    ],
  },
  'aset-digital': {
    title: 'Aset Digital',
    description: 'Koleksi aset digital premium untuk kebutuhan desain, editing, dan kreativitas Anda.',
    items: [
      {
        name: 'Overlay & Tekstur',
        description: 'Koleksi overlay dan tekstur berkualitas tinggi untuk fotografi dan desain grafis. Tersedia berbagai tema.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Overlay%20%26%20Tekstur',
      },
      {
        name: 'Desain Kaos',
        description: 'Koleksi desain kaos siap pakai untuk sablon. Format PNG/vector, resolusi tinggi.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Desain%20Kaos',
      },
      {
        name: 'Desain Undangan & Stiker',
        description: 'Template undangan dan stiker siap edit. Cocok untuk acara pernikahan, ulang tahun, dan event lainnya.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Desain%20Undangan%20%26%20Stiker',
      },
      {
        name: 'Sound Effects',
        description: 'Koleksi sound effects untuk video, podcast, dan konten multimedia. Format MP3/WAV.',
        whatsapp: 'https://wa.me/6285183011318?text=Halo%20saya%20tertarik%20dengan%20Sound%20Effects',
      },
    ],
  },
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('kursus')
  const content = tabContent[activeTab]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Header */}
        <section className="section border-t border-black/[0.04] bg-canvas-100">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-up">
              <span className="section-label">Produk</span>
              <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal-900 mt-3 mb-4">
                Produk <span className="text-maroon-gradient">Digital & Fisik</span>
              </h1>
              <p className="text-charcoal-500 text-sm sm:text-base leading-relaxed">
                Berbagai produk berkualitas dari FokusKonten: kursus video, preset Lightroom, kerajinan kayu Kaila Mebel, template Blogger, dan aset digital premium.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-t border-black/[0.04] bg-white sticky top-0 z-10">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto pb-px scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-maroon-700 text-maroon-700'
                      : 'border-transparent text-charcoal-400 hover:text-charcoal-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section border-t border-black/[0.04]">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-up">
              <div className="max-w-2xl mb-10">
                <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">{content.title}</h2>
                <p className="text-charcoal-500 text-sm leading-relaxed">{content.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {content.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white rounded-2xl border border-black/[0.05] shadow-mature hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-semibold text-lg text-charcoal-900">{item.name}</h3>
                      {item.badge && (
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-maroon-100 text-maroon-700 font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal-500 text-sm leading-relaxed mb-5">{item.description}</p>
                    <a
                      href={item.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Hubungi WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-black/[0.04] bg-white">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-canvas-50 border border-black/[0.05]">
              <h2 className="font-display font-semibold text-2xl text-charcoal-900 mb-3">
                Tidak Menemukan yang Dicari?
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
                Kami juga menerima pesanan custom sesuai kebutuhan spesifik Anda. Hubungi kami untuk diskusi lebih lanjut.
              </p>
              <a
                href="https://wa.me/6285183011318"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
