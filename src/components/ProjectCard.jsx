import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProjectVisual from './ProjectVisual'
import { Arrow, TagList } from './Primitives'

export default function ProjectCard({ project, index, featured = false }) {
  return (
    <article
      className={`project-card${featured ? ' project-card-featured' : ''}`}
    >
      <Link
        className="project-art-link"
        to={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
      >
        <ProjectVisual kind={project.visual} />
      </Link>
      <div className="project-card-copy">
        <p className="eyebrow">
          <span>{String(index + 1).padStart(2, '0')}</span> / {project.category}
        </p>
        <h3>
          <Link to={`/projects/${project.slug}`}>
            {project.title}
            <Arrow />
          </Link>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <TagList tags={project.technologies.slice(0, 3)} />
        <Link
          className="text-link case-study-link"
          to={`/projects/${project.slug}`}
        >
          Explore project <Arrow />
          <span className="sr-only">: {project.title}</span>
        </Link>
      </div>
    </article>
  )
}
ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  featured: PropTypes.bool,
}
