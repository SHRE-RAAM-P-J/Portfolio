import { track as vercelTrack } from '@vercel/analytics';
import { recordEvent } from './visitorStats';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let gaReady = false;

/**
 * Initialize Google Analytics 4 when measurement ID is set.
 */
export function initGoogleAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || gaReady) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  gaReady = true;
}

/**
 * @param {string} name
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  );

  try {
    vercelTrack(name, clean);
  } catch {
    /* Vercel Analytics optional off-platform */
  }

  if (gaReady && window.gtag) {
    window.gtag('event', name, clean);
  }

  // Record to Supabase (non-page-view events)
  if (name !== 'page_view') {
    recordEvent(name, clean);
  }
}

/** @param {string} path */
export function trackPageView(path) {
  trackEvent('page_view', { page_path: path });

  if (gaReady && window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }

  // Also record page_view to Supabase for analytics
  recordEvent('page_view', { path });
}

export function trackProjectClick(projectId, action = 'github') {
  trackEvent('project_click', { project_id: projectId, action });
}

export function trackBlogOpen(blogId, title) {
  trackEvent('blog_open', { blog_id: blogId, blog_title: title });
}

export function trackExternalLink(url, label) {
  trackEvent('external_link', { url, label });
}

export function trackCtaClick(destination) {
  trackEvent('cta_click', { destination });
}

export function trackResumeDownload() {
  trackEvent('resume_download', { format: 'pdf' });
}

export function trackContactSubmit() {
  trackEvent('contact_submit', { method: 'emailjs' });
}
