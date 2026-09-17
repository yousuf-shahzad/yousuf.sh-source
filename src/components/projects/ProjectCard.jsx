import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import ProjectCover from './ProjectCover'
import ProjectLinks from './ProjectLinks'
import TechnologyTags from './TechnologyTags'

export default function ProjectCard({
    project,
    variant = 'listing',
    motionProps = {},
}) {
    const isHome = variant === 'home'
    return (
        <motion.article
            className={`overflow-hidden rounded-lg bg-white shadow-lg ${isHome ? 'mb-4 sm:mb-8' : 'hover:shadow-xl transition-shadow duration-300'}`}
            {...motionProps}
        >
            <ProjectCover project={project} className="aspect-video" />
            <div className="p-5 sm:p-8">
                <h3
                    className={
                        isHome
                            ? 'text-xl sm:text-2xl mb-3 sm:mb-4'
                            : 'text-xl sm:text-2xl font-bold mb-3 sm:mb-4'
                    }
                >
                    {project.title}
                </h3>
                <p
                    className={`text-gray-600 project-description ${isHome ? '' : 'mb-6'}`}
                >
                    {project.description}
                </p>
                {!isHome && (
                    <TechnologyTags technologies={project.technologies} />
                )}
                <ProjectLinks
                    links={project.links}
                    caseStudySlug={
                        project.caseStudyStatus === 'published'
                            ? project.slug
                            : undefined
                    }
                    className={isHome ? 'mt-4' : ''}
                />
            </div>
        </motion.article>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(PropTypes.string),
        links: PropTypes.object,
        caseStudyStatus: PropTypes.string,
        coverImage: PropTypes.string,
        coverImageAlt: PropTypes.string,
        coverImageWidth: PropTypes.number,
        coverImageHeight: PropTypes.number,
    }).isRequired,
    variant: PropTypes.string,
    motionProps: PropTypes.object,
}
