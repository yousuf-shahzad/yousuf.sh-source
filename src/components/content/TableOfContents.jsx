import PropTypes from 'prop-types'

export default function TableOfContents({ headings = [] }) {
    if (!headings.length) return null
    return (
        <nav aria-label="On this page" className="project-toc">
            <p className="font-bold mb-3">On this page</p>
            <ol>
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a href={`#${heading.id}`}>{heading.label}</a>
                    </li>
                ))}
            </ol>
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
