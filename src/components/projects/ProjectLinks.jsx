import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function ProjectLinks({
    links = {},
    caseStudySlug,
    className = '',
}) {
    return (
        <div className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
            {caseStudySlug && (
                <Link
                    to={`/projects/${caseStudySlug}`}
                    className="text-black hover:text-gray-600 underline underline-offset-4"
                >
                    Read case study <span aria-hidden="true">→</span>
                </Link>
            )}
            {links.demo && (
                <a
                    href={links.demo}
                    className="text-black hover:text-gray-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Demo <span aria-hidden="true">↗</span>
                </a>
            )}
            {links.github && (
                <a
                    href={links.github}
                    className="text-black hover:text-gray-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub <span aria-hidden="true">↗</span>
                </a>
            )}
            {links.homepage && (
                <a
                    href={links.homepage}
                    className="text-black hover:text-gray-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Project homepage <span aria-hidden="true">↗</span>
                </a>
            )}
        </div>
    )
}

ProjectLinks.propTypes = {
    links: PropTypes.shape({
        demo: PropTypes.string,
        github: PropTypes.string,
        homepage: PropTypes.string,
    }),
    caseStudySlug: PropTypes.string,
    className: PropTypes.string,
}
