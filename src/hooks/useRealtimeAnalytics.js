import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

/**
 * Hook that provides live analytics data via Supabase Realtime.
 * Returns `{ totalVisits, activeUsers, loading }`.
 */
export default function useRealtimeAnalytics() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Fetch initial snapshot
    async function fetchInitial() {
      try {
        const [{ data: counterData }] = await Promise.all([
          supabase
            .from('visit_counter')
            .select('count')
            .eq('id', 1)
            .single(),
        ]);
        const active = await supabase.rpc('get_active_session_count');
        if (isMounted) {
          setTotalVisits(Number(counterData?.count) || 0);
          setActiveUsers(Number(active) || 0);
          setLoading(false);
        }
      } catch (err) {
        console.warn('[realtime] fetch failed', err);
        if (isMounted) setLoading(false);
      }
    }

    fetchInitial();

    // Subscribe to realtime updates on visit_counter
    const visitSub = supabase
      .channel('public:visit_counter')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'visit_counter' }, (payload) => {
        const newCount = payload?.new?.count;
        if (newCount != null && isMounted) setTotalVisits(Number(newCount));
      })
      .subscribe();

    // Subscribe to active_sessions changes (INSERT/UPDATE/DELETE)
    const activeSub = supabase
      .channel('public:active_sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'active_sessions' }, async () => {
        const count = await supabase.rpc('get_active_session_count');
        if (isMounted) setActiveUsers(Number(count) || 0);
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(visitSub);
      supabase.removeChannel(activeSub);
    };
  }, []);

  return { totalVisits, activeUsers, loading };
}
