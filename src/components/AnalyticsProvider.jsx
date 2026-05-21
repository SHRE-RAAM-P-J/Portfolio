import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGoogleAnalytics, trackPageView } from '../utils/analytics';
import { recordVisit, startSession, endSession } from '../utils/visitorStats';

/**
 * Loads analytics SDKs, records SPA page views,
 * and manages the realtime active-session lifecycle.
 */
export default function AnalyticsProvider() {
  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics();
    recordVisit();
    startSession();

    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return <Analytics />;
}
