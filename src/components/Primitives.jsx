import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      ↗
    </span>
  )
}
export function ButtonLink({ to, children, secondary = false }) {
  return (
    <Link className={`button${secondary ? ' button-secondary' : ''}`} to={to}>
      {children}
      <Arrow />
    </Link>
  )
}
ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
}
export function ExternalLink({ href, children, className = 'text-link' }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display page-title" tabIndex={-1}>
        {title}
      </h1>
      {children && <div className="intro-copy">{children}</div>}
    </header>
  )
}
PageIntro.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
export function TagList({ tags }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  )
}
TagList.propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired }
