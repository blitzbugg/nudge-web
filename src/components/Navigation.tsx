import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { brand, text, surface } from '../design/tokens'
import { Menu, X } from 'lucide-react'

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
] as const

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        background: scrolled ? 'rgba(250,250,250,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', color: text.primary, textDecoration: 'none' }}>
        <img src="/favicon.png" alt="" width={28} height={28} style={{ borderRadius: 6 }} />
        Nudge
      </a>

      <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} style={{ fontSize: '0.875rem', fontWeight: 500, color: text.secondary, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = text.primary }}
            onMouseLeave={(e) => { e.currentTarget.style.color = text.secondary }}
          >{l.label}</a>
        ))}
        <a href="https://github.com/blitzbugg/nudge/releases/download/v1.0.0/nudge-v1.0.0.apk" style={{
          fontSize: '0.875rem', fontWeight: 600, color: text.inverse,
          background: brand.primary, padding: '8px 20px', borderRadius: '999px',
          textDecoration: 'none', transition: 'background 0.15s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = brand.primaryLight }}
          onMouseLeave={(e) => { e.currentTarget.style.background = brand.primary }}
        >Get Nudge</a>
        <a href="https://github.com/blitzbugg/nudge" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '0.8125rem', fontWeight: 600, color: text.secondary,
          border: `1.5px solid ${surface.border}`, padding: '7px 14px',
          borderRadius: '999px', textDecoration: 'none', transition: 'all 0.15s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = text.tertiary; e.currentTarget.style.color = text.primary }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = surface.border; e.currentTarget.style.color = text.secondary }}
        ><GitHubIcon size={14} /> GitHub</a>
      </div>

      <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: text.primary }}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: 56, left: 0, right: 0,
              background: surface.card, padding: '16px 24px',
              borderBottom: `1px solid ${surface.border}`,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                style={{ fontSize: '1rem', fontWeight: 500, color: text.secondary, textDecoration: 'none', padding: '8px 0' }}
              >{l.label}</a>
            ))}
            <a href="https://github.com/blitzbugg/nudge/releases/download/v1.0.0/nudge-v1.0.0.apk" onClick={() => setMobileOpen(false)}
              style={{ fontSize: '0.9375rem', fontWeight: 600, color: text.inverse, background: brand.primary, padding: '10px 20px', borderRadius: '999px', textDecoration: 'none', textAlign: 'center', marginTop: 4 }}
            >Get Nudge</a>
            <a href="https://github.com/blitzbugg/nudge" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.9375rem', fontWeight: 600, color: text.secondary, border: `1.5px solid ${surface.border}`, padding: '10px 20px', borderRadius: '999px', textDecoration: 'none', textAlign: 'center' }}
            ><GitHubIcon size={14} /> GitHub</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
