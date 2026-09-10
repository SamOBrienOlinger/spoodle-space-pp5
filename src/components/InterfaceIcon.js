import React from "react";

// Small, local SVGs keep core controls legible even when the icon CDN is unavailable.
const paths = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h5v-7h4v7h5V9" /></>,
  feed: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  photo: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="9" cy="8" r="1.5" /><path d="m4 17 5-5 4 4 3-3 5 5" /></>,
  heart: <path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z" />,
  comment: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.8-4A8.5 8.5 0 1 1 21 11.5Z" />,
  paw: <><ellipse cx="5" cy="9" rx="2" ry="2.7" /><ellipse cx="10" cy="5" rx="2" ry="2.7" /><ellipse cx="16" cy="5.8" rx="2" ry="2.7" /><ellipse cx="20" cy="10.5" rx="2" ry="2.7" /><path d="M6 18c0-3 3.5-7 6-7s6 4 6 7-4 1-6 1-6 2-6-1Z" /></>,
  health: <><rect x="4" y="4" width="16" height="17" rx="4" /><path d="M9 4V2h6v2M12 9v7M8.5 12.5h7" /></>,
  safety: <><path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6Z" /><path d="M12 8v5m0 3h.01" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 4v2" /></>,
  settings: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" /><circle cx="16" cy="17" r="3" /></>,
  logout: <><path d="M10 3H4v18h6m5-14 5 5-5 5m-7-5h12" /></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  retry: <><path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5" /></>,
};
export default function InterfaceIcon({ name, size = 20, className = "" }) {
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name] || paths.paw}</svg>;
}
