import { Link } from 'react-router-dom'
import { site } from '../data/site'
import projects from '../data/projectsData'
import { getRecentBlogs, formatDate } from '../utils/blogUtils'
import ProjectCard from '../components/ProjectCard'
import ContactCallout from '../components/ContactCallout'
import { Arrow, ButtonLink } from '../components/Primitives'

const selectedProjects = projects
  .filter((project) => project.featuredOrder > 0)
  .sort((a, b) => a.featuredOrder - b.featuredOrder)
export default function Home() {
  const posts = getRecentBlogs(2)
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-topline eyebrow">
          <span>Computer science / UCL</span>
          <span>Personal portfolio</span>
        </div>
        <div className="hero-grid">
          <h1 className="display hero-title" id="home-title" tabIndex={-1}>
            <span>Yousuf</span>
            <span>Shahzad.</span>
          </h1>
          <div className="hero-aside">
            <svg
              className="hero-symbol"
              viewBox="0 0 240 240"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="120"
                cy="120"
                r="96"
                stroke="currentColor"
                opacity=".2"
              />
              <ellipse
                cx="120"
                cy="120"
                rx="48"
                ry="96"
                stroke="currentColor"
                transform="rotate(45 120 120)"
              />
              <ellipse
                cx="120"
                cy="120"
                rx="48"
                ry="96"
                stroke="currentColor"
                transform="rotate(-45 120 120)"
              />
              <path
                d="M24 120H216M120 24V216"
                stroke="currentColor"
                opacity=".2"
              />
              <circle cx="120" cy="120" r="7" fill="currentColor" />
            </svg>
            <p>
              I like understanding how things work.
              <br />
              Then building something of my own.
            </p>
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            {site.education}.<br />
            Building software. Exploring systems.
          </p>
          <div className="actions">
            <ButtonLink to="/projects">Explore my work</ButtonLink>
            <ButtonLink to="/about" secondary>
              A little about me
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="selected-work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Made & learned</p>
            <h2 id="selected-work" className="display section-title">
              Selected work.
            </h2>
          </div>
          <Link className="text-link" to="/projects">
            All projects <span className="count">({projects.length})</span>
            <Arrow />
          </Link>
        </div>
        <div className="project-grid">
          {selectedProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
      <section
        className="about-preview section"
        aria-labelledby="about-preview-title"
      >
        <p className="eyebrow">02 / A little context</p>
        <div>
          <h2 id="about-preview-title" className="display section-title">
            Curiosity comes first.
          </h2>
          <p className="large-copy">
            From a first birthday countdown in HTML to distributed systems and
            web applications, I learn by making things.
          </p>
          <p>
            I’m studying Computer Science at UCL. Away from code, I enjoy video
            editing, graphic design, and sport.
          </p>
          <Link to="/about" className="text-link">
            More about me <Arrow />
          </Link>
        </div>
      </section>
      {posts.length > 0 && (
        <section className="section" aria-labelledby="writing-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Notes along the way</p>
              <h2 id="writing-title" className="display section-title">
                Recent writing.
              </h2>
            </div>
            <Link className="text-link" to="/blog">
              All writing <Arrow />
            </Link>
          </div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="article-row"
              to={`/blog/${post.slug}`}
            >
              <span>{formatDate(post.frontmatter.date)}</span>
              <h3>{post.frontmatter.title}</h3>
              <Arrow />
            </Link>
          ))}
        </section>
      )}
      <ContactCallout />
    </>
  )
}
