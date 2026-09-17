import PropTypes from 'prop-types'

export default function TableOfContents({ headings = [] }) {
    if (!headings.length) return null
    return (
        <nav aria-label="On this page" className="project-toc">
            <details className="project-toc-mobile lg:hidden">
                <summary>
                    <span>Table of Contents</span>
                    <span aria-hidden="true">+</span>
                </summary>
                <ol>
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a href={`#${heading.id}`}>{heading.label}</a>
                        </li>
                    ))}
                </ol>
            </details>
            <div className="hidden lg:block">
                <p className="font-bold mb-3">Table of Contents</p>
                <ol>
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a href={`#${heading.id}`}>{heading.label}</a>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}

TableOfContents.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
}
