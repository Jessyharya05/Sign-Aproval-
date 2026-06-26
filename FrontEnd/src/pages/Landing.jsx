import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, MOCK_USERS } from '../context/AppContext'
import { ArrowRight, Play, Lock, Shield, FileCheck, Zap, CheckCircle2, Users, Globe } from 'lucide-react'
import MfaModal from '../components/MfaModal'
import VerificationModal from '../components/VerificationModal'

const GOOGLE_USERS = MOCK_USERS.slice(0, 2)

export default function Landing() {
  const navigate = useNavigate()
  const { login, completeMfa, completeVerification, showToast } = useApp()
  const [showMfa, setShowMfa] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [choosingUser, setChoosingUser] = useState(false)

  const handleOAuth = () => setChoosingUser(true)

  const handleSelectUser = (u) => {
    login(u)
    setChoosingUser(false)
    setShowMfa(true)
  }

  const handleMfaSuccess = () => {
    completeMfa()
    setShowMfa(false)
    setShowVerify(true)
  }

  const handleVerified = () => {
    completeVerification()
    setShowVerify(false)
    showToast('Identity verified — welcome to SignHere')
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FAF7F2 0%, #F5EDE5 60%, #F0E5DA 100%)' }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,247,242,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-light)', height: 56 }}>
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 32px', height: '100%' }} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ width: 30, height: 30, background: 'var(--brand)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>S</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>SignHere</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1">
              {['Features', 'Security', 'Compliance', 'Enterprise'].map(item => (
                <button key={item} className="btn btn-ghost" style={{ fontSize: 14, color: 'var(--text-2)' }}>{item}</button>
              ))}
            </nav>
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--text-2)' }} onClick={handleOAuth}>Sign in</button>
            <button className="btn btn-primary btn-sm" onClick={handleOAuth}>Get started free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--brand-light)', border: '1px solid #EAC9B8', borderRadius: 99, padding: '5px 14px', marginBottom: 28 }}>
            <Globe size={12} style={{ color: 'var(--brand)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--brand)', textTransform: 'uppercase' }}>eIDAS & ESIGN Act Compliant</span>
          </div>
          <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20, color: 'var(--text-1)' }}>
            The Gold Standard for{' '}
            <span style={{ color: 'var(--brand)' }}>Digital Identity</span>
            {' '}and Signing.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
            Cryptographically secure e-signatures with X.509 certificates, SHA-256 document hashing, Dukcapil identity verification, and comprehensive audit trails — built for enterprise compliance.
          </p>
          <div className="flex items-center gap-3" style={{ marginBottom: 40 }}>
            <button className="btn btn-primary btn-lg" onClick={handleOAuth} style={{ borderRadius: 10 }}>
              Start free trial <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" style={{ borderRadius: 10 }}>
              <Play size={16} style={{ fill: 'currentColor' }} /> Watch demo
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex" style={{ gap: 0 }}>
              {[['#9B3A1A', 'R'], ['#2A6496', 'S'], ['#27723A', 'M']].map(([bg, l], i) => (
                <div key={i} style={{ width: 34, height: 34, background: bg, border: '2.5px solid #FAF7F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, marginLeft: i > 0 ? -10 : 0 }}>{l}</div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Trusted by <strong style={{ color: 'var(--text-1)' }}>5,000+</strong> legal firms</span>
          </div>
        </div>

        {/* Hero card mockup */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 36, height: 36, background: 'var(--brand-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={18} style={{ color: 'var(--brand)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Service_Agreement.pdf</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>SHA-256 hash verified</div>
                </div>
              </div>
              <span className="badge badge-active">Active</span>
            </div>
            <div style={{ padding: 20 }}>
              {[100, 84, 52].map((w, i) => (
                <div key={i} style={{ height: 10, background: 'var(--cream-dark)', borderRadius: 4, width: `${w}%`, marginBottom: i < 2 ? 10 : 0 }} />
              ))}
              <div style={{ marginTop: 20, border: '1.5px dashed #EAC9B8', background: 'var(--brand-light)', borderRadius: 10, padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                onClick={handleOAuth}>
                <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <span style={{ fontSize: 14, color: 'var(--brand)', fontWeight: 500 }}>Click to sign here</span>
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11, color: 'var(--text-4)', fontFamily: 'monospace' }}>X.509 · SHA-256 · PKCS</div>
              <div className="flex items-center gap-2" style={{ fontSize: 12, color: 'var(--text-3)' }}>
                <Lock size={12} /> AES-256 Encrypted
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -16, left: -20, background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: 12, padding: '10px 16px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: 'var(--signed-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--signed-text)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Completed · All signed & locked</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Signed by 3 of 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { icon: Shield, label: 'eIDAS & ESIGN Compliant', sub: 'Legally binding in 195+ countries' },
            { icon: Lock, label: 'AES-256 + TLS 1.3', sub: 'Encrypted at rest and in transit' },
            { icon: Zap, label: 'SHA-256 Document Hashing', sub: 'Tamper-evident baseline hash' },
            { icon: Users, label: 'Multi-party Workflows', sub: 'Sequential & parallel signing' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="card flex items-center gap-3" style={{ padding: '18px 20px' }}>
              <div style={{ width: 38, height: 38, background: 'var(--brand-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={19} style={{ color: 'var(--brand)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <div className="card" style={{ padding: '40px 48px', background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2620 100%)', border: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16 }}>BRD-004 Compliance</div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16, letterSpacing: '-0.5px' }}>Built to international e-signature standards</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7 }}>
                SignHere implements X.509 digital certificates, PKCS standards, SHA-256 cryptographic hashing, and full compliance with eIDAS and the ESIGN Act out of the box.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['eIDAS', 'ESIGN Act', 'X.509', 'PKCS#7', 'SHA-256', 'AES-256'].map(label => (
                <div key={label} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} style={{ color: '#7BC67A', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OAuth chooser overlay */}
      {choosingUser && (
        <div className="modal-overlay" onClick={() => setChoosingUser(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: 'var(--brand)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>S</span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Sign in to SignHere</h2>
              <p style={{ color: 'var(--text-3)', fontSize: 14 }}>Choose your Google account to continue (FR-001 — OAuth 2.0)</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {GOOGLE_USERS.map(u => (
                <button key={u.id} onClick={() => handleSelectUser(u)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: 10, background: 'var(--white)', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s', width: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'var(--brand-light)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--white)' }}>
                  <div style={{ width: 40, height: 40, background: u.avatarColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{u.initials}</div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{u.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{u.email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-3)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Continue
                  </div>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-4)', textAlign: 'center', lineHeight: 1.6 }}>
              By continuing, you agree to SignHere's Terms of Service and Privacy Policy.<br />OAuth 2.0 authentication enforced per FR-001.
            </p>
          </div>
        </div>
      )}

      {showMfa && <MfaModal onSuccess={handleMfaSuccess} onClose={() => setShowMfa(false)} />}
      {showVerify && <VerificationModal onSuccess={handleVerified} onClose={() => setShowVerify(false)} />}
    </div>
  )
}
