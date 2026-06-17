import { navigateHash } from '../utils/routing';

export default function LandingPage() {
  const goLogin = (redirect = 'dashboard') => navigateHash('login', { redirect });

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 40%, #0a1628 100%)',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>

      {/* Background grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none'
      }} />

      {/* Glow effects */}
      <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '68px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="PMRG Solution logo" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(1.2)' }} />
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.01em' }}></span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => goLogin('risk')}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#cbd5e1', borderRadius: '8px', padding: '8px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cbd5e1'; }}
          >View Risk Map</button>
          <button
            onClick={() => goLogin('dashboard')}
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', border: 'none', color: '#fff', borderRadius: '8px', padding: '9px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(59,130,246,0.4)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >Open Dashboard &#8594;</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '90px 24px 70px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', padding: '6px 18px', marginBottom: '32px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#93c5fd', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Governance Decision Control Layer</span>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '24px', margin: '0 auto 24px' }}>
          AI-Assisted
          <span style={{ display: 'block', background: 'linear-gradient(90deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Governance Platform</span>
        </h1>

        <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 40px' }}>
          An AI-assisted university governance platform that provides full visibility across admissions, finance, compliance, student lifecycle, and channel recruitment — with smart governance tools for university leadership.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => goLogin('dashboard')}
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', border: 'none', color: '#fff', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,130,246,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.4)'; }}
          >Launch Governance Control Centre &#8594;</button>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Authorized Personnel Only &#x2022; Enterprise SSO Integrated</span>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', position: 'relative', zIndex: 10 }}>
        {[
          {
            icon: '\u26A1',
            num: '1.',
            title: 'Governance Workflow',
            text: 'Complete 8-gate student lifecycle controlling application-to-enrollment flow. Tracks admissions automatically from intake, through compliance and finance, to final registration.'
          },
          {
            icon: '\uD83D\uDCC4',
            num: '2.',
            title: 'Document Intelligence',
            text: 'AI-driven intake system that automatically verifies student documents, flags defects, and tracks ministry attestation decrees and visa compliance requirements.'
          },
          {
            icon: '\uD83D\uDCCA',
            num: '3.',
            title: 'Portfolio Visibility',
            text: 'Real-time executive dashboard including multi-dimensional risk heatmaps, channel performance matrices, SLA breach monitors, and institutional compliance scores.'
          },
        ].map((card, i) => (
          <div key={i}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>{card.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9', marginBottom: '10px' }}>{card.num} {card.title}</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>{card.text}</p>
          </div>
        ))}
      </section>

      {/* BOTTOM TRUST BAR */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 10 }}>
        {[
          { icon: '\uD83E\uDD16', label: 'UNIVERSITY GOVERNANCE BUDDY', tag: 'SSO ACCESS', desc: 'Directly launch conversational AI assistant for admissions, compliance, visa risk, and governance decisions (SSO login required).' },
          { icon: '\u2705', label: 'HUMAN-IN-THE-LOOP APPROVAL', tag: null, desc: 'AI assessment prompts and suggestions, but all critical governance decisions require authorized human verification and sign-off.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.08em' }}>{item.label}</span>
                {item.tag && <span style={{ fontSize: '9px', fontWeight: '800', color: '#34d399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '2px 8px', letterSpacing: '0.06em' }}>{item.tag}</span>}
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>&#169; 2026 PMRG Solution. All rights reserved. &#x2022; Internal Governance Control Layer</p>
      </footer>
    </main>
  );
}
