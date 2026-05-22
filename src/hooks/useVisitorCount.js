import { useEffect, useState } from 'react';

const VISIT_KEY = 'portfolio-visit-recorded';
const API_BASE = 'https://api.counterapi.dev/v1/shre-raam-portfolio/visits';

/**
 * A simple hook that records a new portfolio visit (once per session)
 * and fetches the total persistent visits count from CounterAPI.dev.
 * Returns { totalVisits, loading }
 */
export default function useVisitorCount() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function recordAndFetch() {
      try {
        const isRecorded = sessionStorage.getItem(VISIT_KEY);
        let url = isRecorded ? API_BASE : `${API_BASE}/up`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`CounterAPI responded with status: ${res.status}`);
        }
        
        const data = await res.json();
        const countValue = Number(data?.count ?? data?.value ?? 0);

        if (countValue > 0) {
          if (!isRecorded) {
            try {
              sessionStorage.setItem(VISIT_KEY, '1');
            } catch {
              /* Handle storage disabled / private browsing */
            }
          }
          if (isMounted) {
            setTotalVisits(countValue);
          }
        }
      } catch (err) {
        console.warn('[analytics] CounterAPI call failed, attempting fallback get:', err);
        try {
          const res = await fetch(API_BASE);
          if (res.ok) {
            const data = await res.json();
            const countValue = Number(data?.count ?? data?.value ?? 0);
            if (isMounted && countValue > 0) {
              setTotalVisits(countValue);
            }
          }
        } catch (fallbackErr) {
          console.warn('[analytics] CounterAPI fallback get failed:', fallbackErr);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    recordAndFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return { totalVisits, loading };
}
