import { Link, useParams } from 'react-router-dom'
import projects from '../data/projectsData'
import ProjectVisual from '../components/ProjectVisual'
import ContactCallout from '../components/ContactCallout'
import {
  Arrow,
  ExternalLink,
  PageIntro,
  TagList,
} from '../components/Primitives'
import NotFound from './NotFound'
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFound kind="project" />
  const { caseStudy } = project
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <>
      <Link className="text-link back-link" to="/projects">
        ← All projects
      </Link>
      <PageIntro
        eyebrow={`Case study / ${project.category}`}
        title={project.title}
      >
        <p>{project.summary}</p>
      </PageIntro>
      <figure className="case-visual">
        <ProjectVisual kind={project.visual} />
        <figcaption>Concept illustration · {project.category}</figcaption>
      </figure>
      <div className="case-layout">
        <aside className="case-facts">
          <div>
            <h2 className="eyebrow">My contribution</h2>
            <p>{caseStudy.role}</p>
          </div>
          <div>
            <h2 className="eyebrow">Project context</h2>
            <p>{caseStudy.context}</p>
          </div>
          <div>
            <h2 className="eyebrow">Built with</h2>
            <TagList tags={project.technologies} />
          </div>
          <div className="case-links">
            {project.links.demo && (
              <ExternalLink href={project.links.demo}>
                Visit live project
              </ExternalLink>
            )}
            {project.links.github && (
              <ExternalLink href={project.links.github}>
                Explore the source
              </ExternalLink>
            )}
          </div>
        </aside>
        <article className="case-story">
          <section>
            <p className="eyebrow">01 / The starting point</p>
            <h2 className="display">The problem.</h2>
            <p>{caseStudy.problem}</p>
          </section>
          <section>
            <p className="eyebrow">02 / The approach</p>
            <h2 className="display">Building the solution.</h2>
            <p>{caseStudy.solution}</p>
            <ul className="highlights">
              {caseStudy.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className="eyebrow">03 / Looking back</p>
            <h2 className="display">What I learned.</h2>
            <p>{caseStudy.lessons}</p>
          </section>
        </article>
      </div>
      <Link className="next-project" to={`/projects/${next.slug}`}>
        <span className="eyebrow">Keep exploring / Next project</span>
        <span className="display">{next.title}</span>
        <Arrow />
      </Link>
      <ContactCallout />
    </>
  )
}
