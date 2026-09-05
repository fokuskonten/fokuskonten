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
            setCtaText(data.ctaText || 'Toko Istirahat (Server Offline)');
          }
        }
      } catch (e) {
        // Jika koneksi gagal, timeout, atau server PC mati -> Konfirmasi server sedang off
        if (isMounted) {
          setIsOffline(true);
          setCtaText('Toko Istirahat (Server Offline)');
        }
      }
    }
    
    checkHealth();
  }, []);

  return { isOffline, ctaText };
}
