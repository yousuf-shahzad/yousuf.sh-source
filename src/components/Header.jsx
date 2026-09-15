import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, site } from '../data/site'
import { getAllBlogs } from '../utils/blogUtils'

const links = getAllBlogs().length
  ? [
      ...navigation.slice(0, 2),
      { label: 'Writing', path: '/blog' },
      navigation[2],
    ]
  : navigation

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const drawer = useRef(null)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = [
      ...document.querySelectorAll(
        '#main-content, .site-footer, .skip-link, .header-inner .wordmark',
      ),
    ]
    const previousInert = background.map((element) => element.inert)
    background.forEach((element) => {
      element.inert = true
    })
    drawer.current?.querySelector('a')?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...drawer.current.querySelectorAll('a')]
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    const media = window.matchMedia('(min-width: 768px)')
    const onResize = () => {
      if (media.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element, index) => {
        element.inert = previousInert[index]
      })
      document.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onResize)
    }
  }, [open])
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          Y.SH
        </Link>
        <span className="header-location">{site.location}</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? 'Close' : 'Menu'}{' '}
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          ref={drawer}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <p className="eyebrow">Explore</p>
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
            >
              <span className="eyebrow">0{index + 1}</span>
              {link.label}
              <span aria-hidden="true">↗</span>
            </NavLink>
          ))}
          <a className="mobile-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </nav>
      )}
    </header>
  )
}
