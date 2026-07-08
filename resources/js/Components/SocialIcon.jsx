export default function SocialIcon({ platform, ...props }) {
  const p = (platform || '').toLowerCase();
  const c = { width: 18, height: 18, ...props };
  switch (p) {
    case 'instagram':
      return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...c}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>);
    case 'facebook':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>);
    case 'tiktok':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M16 8.2a6.5 6.5 0 0 0 3.5 1.1V6.6a3.9 3.9 0 0 1-3.5-3.6h-2.7v11a2 2 0 1 1-1.9-2V9.3A4.9 4.9 0 1 0 16 14.2z" /></svg>);
    case 'youtube':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3z" /></svg>);
    case 'twitter':
    case 'x':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.8l-5.3-6.9L5.1 22H2l8-9.1L1.5 2h7l4.8 6.4zM17.7 20h1.7L7.4 3.9H5.6z" /></svg>);
    case 'whatsapp':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3A2.8 2.8 0 0 0 6 8.8a4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c2.4 1 2.4.7 2.9.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.5-.3z" /></svg>);
    case 'linkedin':
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0zM8 8h4.8v2.2h.1a5.3 5.3 0 0 1 4.8-2.6c5 0 6 3.3 6 7.6V24h-5v-7c0-1.7 0-3.9-2.4-3.9s-2.7 1.8-2.7 3.7V24H8z" /></svg>);
    default:
      return (<svg viewBox="0 0 24 24" fill="currentColor" {...c}><circle cx="12" cy="12" r="10" /></svg>);
  }
}