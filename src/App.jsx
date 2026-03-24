import React, { useState, useEffect } from 'react'
import './App.css'

const PROJECTS = [
  { name: 'fraud-detection-pipeline', desc: 'Real-time transaction scoring with XGBoost', lang: 'Python', status: 'live', stars: 42, color: '#60a5fa' },
  { name: 'global-health-dashboard', desc: 'WHO-funded disease impact visualization', lang: 'React', status: 'live', stars: 31, color: '#4ade80' },
  { name: 'time-series-forecaster', desc: 'Auto insurance claims forecasting engine', lang: 'Python', status: 'building', stars: 18, color: '#fb923c' },
]

const STACK = ['React', 'Python', 'PySpark', 'AWS', 'PostgreSQL', 'Airflow', 'Docker', 'XGBoost']

const STATUS_CONFIG = {
  live:     { label: 'Live',     color: '#4ade80' },
  building: { label: 'Building', color: '#fb923c' },
  paused:   { label: 'Paused',   color: '#666' },
}

function useTyped(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

function StatusDot({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.paused
  return (
    <span className="status-dot-wrap">
      {status === 'live' && <span className="status-ping" style={{ background: cfg.color }} />}
      <span className="status-dot" style={{ background: cfg.color }} />
      <span className="status-label" style={{ color: cfg.color }}>{cfg.label}</span>
    </span>
  )
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="project-card" style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="project-top">
        <span className="project-name">{project.name}</span>
        <StatusDot status={project.status} />
      </div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-meta">
        <span className="lang-badge" style={{ color: project.color, borderColor: project.color + '44', background: project.color + '11' }}>{project.lang}</span>
        <span className="stars">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {project.stars}
        </span>
      </div>
      {hovered && <div className="card-glow" style={{ background: project.color }} />}
    </div>
  )
}

export default function App() {
  const [clicks, setClicks] = useState(0)
  const role = useTyped(['Data Scientist', 'Data Engineer', 'ML Engineer', 'Problem Solver'])
  const deployedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><span className="logo-dot" />devpulse</div>
        <div className="nav-right">
          <span className="deployed-badge"><span className="deploy-dot" />deployed {deployedAt}</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-tag">available for hire</div>
        <h1 className="hero-name">Prajwal Tidke</h1>
        <p className="hero-role"><span className="typed">{role}</span><span className="cursor">|</span></p>
        <div className="hero-actions">
          <button className="btn-secondary" onClick={() => setClicks(c => c + 1)}>
            {clicks === 0 ? 'Say hello 👋' : `Said hello ${clicks}x 🎉`}
          </button>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <span className="section-count">{PROJECTS.length} repos</span>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-header"><h2 className="section-title">Stack</h2></div>
        <div className="stack-row">
          {STACK.map((s, i) => <span key={s} className="stack-chip" style={{ animationDelay: `${i * 60}ms` }}>{s}</span>)}
        </div>
      </section>

      <footer className="footer">
        <span className="footer-mono">Built with React · Deployed on Vercel</span>
        <span className="footer-dot" />
        <span className="footer-mono">Open source · Fork it</span>
      </footer>
    </div>
  )
}