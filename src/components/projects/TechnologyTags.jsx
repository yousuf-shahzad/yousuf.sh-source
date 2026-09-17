import PropTypes from 'prop-types'

export default function TechnologyTags({ technologies = [] }) {
    if (!technologies.length) return null
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((technology) => (
                <span
                    key={technology}
                    className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
                >
                    {technology}
                </span>
            ))}
        </div>
    )
}

TechnologyTags.propTypes = { technologies: PropTypes.arrayOf(PropTypes.string) }
