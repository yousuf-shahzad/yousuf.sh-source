import projects from '../data/projectsData'
import ProjectCard from '../components/ProjectCard'
import ContactCallout from '../components/ContactCallout'
import { PageIntro } from '../components/Primitives'
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Work / A selection of things I’ve built"
        title="Ideas into practice."
      >
        <p>
          Web applications, small tools, and systems that connect. Each project
          is a different way of learning by doing.
        </p>
      </PageIntro>
      <section aria-labelledby="projects-title">
        <div className="list-heading">
          <h2 id="projects-title" className="eyebrow">
            Project index
          </h2>
          <span className="eyebrow">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <ContactCallout />
    </>
  )
}
