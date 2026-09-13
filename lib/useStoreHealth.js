import { useState, useEffect } from 'react';
import { getApiBaseUrl } from './apiConfig';

export function useStoreHealth() {
  const [isOffline, setIsOffline] = useState(false);
  const [ctaText, setCtaText] = useState('Beli Sekarang');
  
  useEffect(() => {
    // Hindari ping jika di server SSR
    if (typeof window === 'undefined') return;
    
    let isMounted = true;
    
    async function checkHealth() {
      try {
        const baseUrl = getApiBaseUrl();
        const healthUrl = baseUrl.endsWith('/api/v1') 
          ? `${baseUrl}/health` 
          : `${baseUrl}/api/v1/health`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(healthUrl, { 
          signal: controller.signal, 
          cache: 'no-store' 
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`Health HTTP ${res.status}`);
        const data = await res.json();
        
        if (isMounted) {
          const isHealthy = (data.status === 'ONLINE' || data.health === 'HEALTHY' || data.status === 'ok');
          if (isHealthy && !data.isOffline) {
            setIsOffline(false);
            setCtaText('Beli Sekarang');
          } else {
            setIsOffline(true);
            setCtaText(data.ctaText || 'Pesan via WhatsApp Resmi');
          }
        }
      } catch (e) {
        // Jika koneksi timeout atau sedang dialihkan ke sekoci
        if (isMounted) {
          setIsOffline(true);
          setCtaText('Pesan via WhatsApp Resmi');
        }
      }
    }
    
    checkHealth();
  }, []);

  return { isOffline, ctaText, isLoaded: true };
}

/**
 * Menghasilkan tautan resmi WhatsApp FokusKonten dengan pesan terformat rapi sesuai konteks halaman
 */
export function getWhatsAppContextUrl({ pathname = '', appName = '', projectTitle = '', topic = '', sku = '', title = '' } = {}) {
  const phone = '6285183011318';
  let message = 'Halo FokusKonten, saya ingin berkonsultasi mengenai software dan layanan resmi FokusKonten.';

  if (appName) {
    message = `Halo FokusKonten,\n\nSaya tertarik dengan aplikasi *${appName}* di fokuskonten.my.id.\nMohon info konsultasi teknis dan lisensi resminya.`;
  } else if (projectTitle) {
    message = `Halo FokusKonten,\n\nSaya melihat portofolio proyek *${projectTitle}* di fokuskonten.my.id.\nSaya tertarik untuk mendiskusikan pengembangan solusi serupa untuk bisnis saya.`;
  } else if (sku && title) {
    message = `Halo Admin FokusKonten,\n\nSaya ingin memesan produk digital:\n*${sku} - ${title}*\nMohon info rekening pembayaran resmi / panduan akses.`;
  } else if (topic) {
    message = `Halo FokusKonten,\n\nSaya ingin berkonsultasi mengenai: *${topic}*.`;
  } else if (pathname === '/layanan/' || pathname === '/layanan') {
    message = 'Halo FokusKonten,\n\nSaya ingin konsultasi jasa pembuatan software / aplikasi Android kustom untuk kebutuhan usaha saya.';
  } else if (pathname === '/lisensi/' || pathname === '/lisensi') {
    message = 'Halo FokusKonten,\n\nSaya ingin menanyakan ketentuan lisensi custom / enterprise untuk aplikasi dan software FokusKonten.';
  } else if (pathname === '/kontak/' || pathname === '/kontak') {
    message = 'Halo FokusKonten,\n\nSaya ingin berkonsultasi langsung dengan tim software engineer FokusKonten.';
  } else if (pathname === '/login/' || pathname === '/login' || pathname === '/akun/' || pathname === '/akun') {
    message = 'Halo Admin FokusKonten,\n\nSaya ingin konfirmasi akun / verifikasi lisensi pembelian saya.';
  } else if (pathname.includes('/toko-digital')) {
    message = 'Halo Admin FokusKonten,\n\nSaya ingin menanyakan informasi pemesanan produk digital di katalog fokuskonten.my.id.';
  } else if (pathname.includes('/aplikasi')) {
    message = 'Halo FokusKonten,\n\nSaya ingin konsultasi mengenai katalog produk dan aplikasi resmi FokusKonten.';
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
