import { useRef, useState, useEffect } from 'react'
import { site } from '../data/site'
import { Arrow, ExternalLink, PageIntro } from '../components/Primitives'
export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copyEmail = async () => {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyStatus('Email address copied.')
    } catch {
      setCopyStatus(
        'Could not copy automatically. You can select the address above.',
      )
    }
    timer.current = setTimeout(() => setCopyStatus(''), 5000)
  }
  return (
    <>
      <PageIntro
        eyebrow="Contact / Start a conversation"
        title="Good things start with hello."
      >
        <p>
          A project, a question, or something you think I’d find interesting.
          I’d love to hear about it.
        </p>
      </PageIntro>
      <section className="contact-main" aria-labelledby="email-title">
        <p id="email-title" className="eyebrow">
          Email is the best way to reach me
        </p>
        <a className="display email-display" href={`mailto:${site.email}`}>
          {site.email}
          <Arrow />
        </a>
        <div className="actions">
          <a className="button" href={`mailto:${site.email}`}>
            Write an email <Arrow />
          </a>
          <button className="button button-secondary" onClick={copyEmail}>
            Copy address <span aria-hidden="true">+</span>
          </button>
        </div>
        <p className="copy-status" role="status">
          {copyStatus}
        </p>
      </section>
      <section className="contact-elsewhere" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title" className="eyebrow">
          Elsewhere
        </h2>
        <ExternalLink href={site.github}>GitHub</ExternalLink>
        <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
        <p>
          {site.location}
          <br />
          {site.education}
        </p>
      </section>
    </>
  )
}
