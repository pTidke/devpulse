import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Zero Config Deploys',
    desc: 'Push to GitHub. Vercel detects your framework automatically and builds it. No YAML, no Dockerfiles, no setup.',
    color: '#e8f542',
  },
  {
    icon: '🌍',
    title: 'Global Edge Network',
    desc: 'Your app is served from 100+ locations worldwide. Users get the nearest server — automatically.',
    color: '#60a5fa',
  },
  {
    icon: '🔍',
    title: 'Preview Deployments',
    desc: 'Every pull request gets its own live URL. Share with your team before anything merges to main.',
    color: '#4ade80',
  },
  {
    icon: '🔒',
    title: 'Secure Env Variables',
    desc: 'Add API keys and secrets in the dashboard. Never commit a .env file to GitHub again.',
    color: '#fb923c',
  },
  {
    icon: '📊',
    title: 'Analytics & Insights',
    desc: 'Real user performance data out of the box. See Core Web Vitals, load times, and visitor trends.',
    color: '#c084fc',
  },
  {
    icon: '↩️',
    title: 'Instant Rollbacks',
    desc: 'Something broke in production? Roll back to any previous deployment in one click.',
    color: '#f87171',
  },
]

const STEPS = [
  { num: '01', title: 'Push to GitHub', desc: 'Commit your code and push to any branch.', icon: '📁' },
  { num: '02', title: 'Vercel Detects & Builds', desc: 'Auto-detects React, Next.js, Vue, Svelte and more. Runs your build command.', icon: '🔨' },
  { num: '03', title: 'Deployed to Edge', desc: 'Your app goes live on a global CDN in seconds. You get a URL instantly.', icon: '🚀' },
  { num: '04', title: 'Every PR gets a Preview', desc: 'Open a pull request → get a unique live URL for that branch automatically.', icon: '🔗' },
]

const FRAMEWORKS = ['Next.js', 'React', 'Vue', 'Svelte', 'Nuxt', 'Astro', 'Remix', 'Angular']

const TIMELINE = [
  { time: '0s',   label: 'You push to GitHub' },
  { time: '5s',   label: 'Vercel detects the framework' },
  { time: '15s',  label: 'Dependencies installed' },
  { time: '28s',  label: 'Build complete' },
  { time: '32s',  label: '🎉 Live on global edge' },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function AnimatedTimeline() {
  const ref = useRef()
  const inView = useInView(ref)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      setActive(i)
      i++
      if (i >= TIMELINE.length) clearInterval(interval)
    }, 600)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="timeline">
      {TIMELINE.map((t, i) => (
        <div key={i} className={`tl-row ${active >= i ? 'tl-active' : ''}`}>
          <div className="tl-time">{t.time}</div>
          <div className="tl-line-wrap">
            <div className="tl-dot" />
            {i < TIMELINE.length - 1 && <div className="tl-connector" />}
          </div>
          <div className="tl-label">{t.label}</div>
        </div>
      ))}
    </div>
  )
}

function DeployButton() {
  const [state, setState] = useState('idle')

  const handleDeploy = () => {
    if (state !== 'idle') return
    setState('building')
    setTimeout(() => setState('done'), 2800)
    setTimeout(() => setState('idle'), 5000)
  }

  return (
    <div className="deploy-demo">
      <div className="deploy-terminal">
        <div className="terminal-dots">
          <span /><span /><span />
        </div>
        <div className="terminal-body">
          {state === 'idle' && <span className="t-muted">$ git push origin main<span className="t-cursor">_</span></span>}
          {state === 'building' && (
            <div className="t-building">
              <div className="t-line">$ git push origin main</div>
              <div className="t-line t-green">✓ Vercel detected React</div>
              <div className="t-line">  Installing dependencies...</div>
              <div className="t-line">  Building... <span className="t-spinner">⠋</span></div>
            </div>
          )}
          {state === 'done' && (
            <div className="t-building">
              <div className="t-line">$ git push origin main</div>
              <div className="t-line t-green">✓ Build complete (28s)</div>
              <div className="t-line t-green">✓ Deployed to edge network</div>
              <div className="t-line t-accent">🎉 https://my-app.vercel.app</div>
            </div>
          )}
        </div>
      </div>
      <button
        className={`deploy-btn ${state}`}
        onClick={handleDeploy}
      >
        {state === 'idle' && '▶ Simulate a Deploy'}
        {state === 'building' && '⠋ Building...'}
        {state === 'done' && '✓ Live! Run again?'}
      </button>
    </div>
  )
}

export default function App() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">
          <svg width="18" height="18" viewBox="0 0 76 65" fill="currentColor"><path d="M37.532 0L75.065 64.5H0L37.532 0z"/></svg>
          Vercel
        </div>
        <div className="nav-links">
          <span>Deploy in 30s</span>
          <a className="nav-cta" href="https://vercel.com" target="_blank" rel="noreferrer">Try it free ↗</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">Ship faster. Scale automatically.</div>
        <h1 className="hero-headline">
          From <span className="hl-code">git push</span><br />
          to <span className="hl-live">live in 30s</span>
        </h1>
        <p className="hero-sub">
          Vercel is the platform that takes your frontend code and makes it globally available — instantly, automatically, with zero server setup.
        </p>
        <DeployButton />
      </section>

      {/* How it works */}
      <section className="section">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Four steps. Zero headaches.</h2>
        <div className="steps-wrap">
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`step-item ${activeStep === i ? 'step-active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="step-num">{s.num}</div>
                <div>
                  <div className="step-title">{s.icon} {s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <AnimatedTimeline />
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything you need. Nothing you don't.</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ '--fc': f.color, animationDelay: `${i * 80}ms` }}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Frameworks */}
      <section className="section section-frameworks">
        <div className="section-label">Compatibility</div>
        <h2 className="section-title">Works with your stack.</h2>
        <div className="fw-row">
          {FRAMEWORKS.map((f, i) => (
            <div key={f} className="fw-chip" style={{ animationDelay: `${i * 60}ms` }}>{f}</div>
          ))}
        </div>
        <p className="fw-note">…and any framework that outputs static files or runs Node.js</p>
      </section>

      {/* Preview deployments callout */}
      <section className="section section-preview">
        <div className="preview-card">
          <div className="preview-left">
            <div className="section-label">Preview Deployments</div>
            <h2 className="preview-title">Every PR. Its own live URL.</h2>
            <p className="preview-desc">
              Open a pull request on GitHub and Vercel automatically spins up a unique deployment for that branch. Share it with your team, your client, or your professor — before anything touches main.
            </p>
            <div className="preview-url">
              🔗 my-app-<span className="url-branch">git-feature-nav</span>.vercel.app
            </div>
          </div>
          <div className="preview-right">
            <div className="pr-card">
              <div className="pr-top">
                <span className="pr-dot" />
                <span className="pr-title">feat: add dark mode toggle</span>
              </div>
              <div className="pr-bot">
                <div className="bot-avatar">▲</div>
                <div className="bot-msg">
                  <div className="bot-name">Vercel Bot</div>
                  <div className="bot-text">✅ Preview ready → <span className="bot-link">Visit Preview</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <h2 className="cta-title">Ready to ship?</h2>
        <p className="cta-sub">Connect your GitHub repo and deploy your first app in under 60 seconds. Free forever for personal projects.</p>
        <a className="cta-btn" href="https://vercel.com/new" target="_blank" rel="noreferrer">
          Start deploying → vercel.com/new
        </a>
      </section>

      <footer className="footer">
        <span className="footer-mono">Built with React · Deployed on Vercel · This site is the demo</span>
      </footer>
    </div>
  )
}