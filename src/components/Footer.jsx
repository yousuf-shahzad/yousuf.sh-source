import { Link } from 'react-router-dom'
import { site, navigation } from '../data/site'
import { ExternalLink } from './Primitives'
export default function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          Y.SH
        </Link>
        <p>
          Built with curiosity.
          <br />
          Based in London.
        </p>
        <nav aria-label="Footer navigation">
          {navigation.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-social">
          <ExternalLink href={site.github}>GitHub</ExternalLink>
          <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <ExternalLink href={site.source}>View source</ExternalLink>
      </div>
    </footer>
  )
}
