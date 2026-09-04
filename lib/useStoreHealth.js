
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
        // Tembak worker Cloudflare kita
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error('Worker Error');
        const data = await res.json();
        
        if (isMounted) {
          if (data.status === 'offline') {
            setIsOffline(true);
            setCtaText(data.ctaText || 'Toko Istirahat (PC Offline)');
          } else {
            setIsOffline(false);
            setCtaText('Beli Sekarang');
          }
        }
      } catch (e) {
        // Fallback jika worker gagal, coba hit lokal
        if (isMounted) setIsOffline(false);
      }
    }
    
    checkHealth();
  }, []);

  return { isOffline, ctaText };
}
