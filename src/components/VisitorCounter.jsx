import { useState } from 'react';
import useVisitorCount from '../hooks/useVisitorCount';

export default function VisitorCounter() {
  const { totalVisits, loading } = useVisitorCount();

  if (loading) {
    return (
      <div className="vc-root" style={{ opacity: 1, visibility: 'visible' }}>
        <div className="vc-metric">
          <span className="vc-metric-icon" aria-hidden>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3C4.364 3 1.258 5.578.12 7.764a.5.5 0 000 .472C1.258 10.422 4.364 13 8 13s6.742-2.578 7.88-4.764a.5.5 0 000-.472C14.742 5.578 11.636 3 8 3z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <div className="vc-metric-body" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
            <span className="vc-metric-value" style={{ fontSize: '1.05rem' }}>
              Loading...
            </span>
            <span className="vc-metric-label" style={{ fontSize: '0.78rem', textTransform: 'none', letterSpacing: 'normal', marginTop: '1px' }}>
              Portfolio Visits
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (totalVisits === 0) {
    return (
      <div className="vc-root" style={{ opacity: 1, visibility: 'visible' }}>
        <div className="vc-metric">
          <span className="vc-metric-icon" aria-hidden>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3C4.364 3 1.258 5.578.12 7.764a.5.5 0 000 .472C1.258 10.422 4.364 13 8 13s6.742-2.578 7.88-4.764a.5.5 0 000-.472C14.742 5.578 11.636 3 8 3z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <div className="vc-metric-body" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
            <span className="vc-metric-value" style={{ fontSize: '1.05rem' }}>
              Visitor counter unavailable
            </span>
          </div>
        </div>
      </div>
    );
  }

  const formatted = new Intl.NumberFormat('en-US').format(totalVisits);

  return (
    <div className="vc-root" style={{ opacity: 1, visibility: 'visible' }}>
      <div className="vc-metric">
        <span className="vc-metric-icon" aria-hidden>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3C4.364 3 1.258 5.578.12 7.764a.5.5 0 000 .472C1.258 10.422 4.364 13 8 13s6.742-2.578 7.88-4.764a.5.5 0 000-.472C14.742 5.578 11.636 3 8 3z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
        <div className="vc-metric-body" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
          <span className="vc-metric-value" style={{ fontSize: '1.05rem' }}>
            {formatted}
          </span>
          <span className="vc-metric-label" style={{ fontSize: '0.78rem', textTransform: 'none', letterSpacing: 'normal', marginTop: '1px' }}>
            Portfolio Visits
          </span>
        </div>
      </div>
    </div>
  );
}

