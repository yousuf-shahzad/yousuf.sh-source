import PropTypes from 'prop-types'

export default function ProjectCover({
    project,
    className = '',
    loading = 'lazy',
}) {
    if (!project.coverImage) return null

    return (
        <img
            src={project.coverImage}
            alt={project.coverImageAlt}
            width={project.coverImageWidth}
            height={project.coverImageHeight}
            loading={loading}
            className={`w-full object-cover ${className}`}
        />
    )
}

ProjectCover.propTypes = {
    project: PropTypes.shape({
        coverImage: PropTypes.string,
        coverImageAlt: PropTypes.string,
        coverImageWidth: PropTypes.number,
        coverImageHeight: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
    loading: PropTypes.oneOf(['eager', 'lazy']),
}
