import TechnologyTags from './TechnologyTags'
import PropTypes from 'prop-types'

export default function ProjectFacts({ project }) {
    const facts = [
        ['Role', project.role],
        ['Team', project.team?.join(', ')],
        ['Period', project.period],
        ['Status', project.projectStatus],
    ]
    return (
        <aside className="rounded-lg bg-white shadow-sm p-6 mb-10">
            <dl className="grid gap-4 sm:grid-cols-2">
                {facts
                    .filter(([, value]) => value)
                    .map(([term, value]) => (
                        <div key={term}>
                            <dt className="text-sm text-gray-500">{term}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
            </dl>
            <div className="mt-5">
                <TechnologyTags technologies={project.technologies} />
            </div>
        </aside>
    )
}

ProjectFacts.propTypes = {
    project: PropTypes.shape({
        role: PropTypes.string,
        team: PropTypes.arrayOf(PropTypes.string),
        period: PropTypes.string,
        projectStatus: PropTypes.string,
        technologies: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}
