import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../components/content/MarkdownContent'
import TableOfContents from '../components/content/TableOfContents'
import PageTransition from '../components/PageTransition'
import ProjectCover from '../components/projects/ProjectCover'
import ProjectFacts from '../components/projects/ProjectFacts'
import ProjectLinks from '../components/projects/ProjectLinks'
import ScrollProgress from '../components/ScrollProgress'
import usePageMetadata from '../hooks/usePageMetadata'
import {
    getProjectBySlug,
    getPublishedRelatedProjects,
} from '../utils/projectUtils'

const requiredSections = [
    ['problem', 'Problem'],
    ['my-contribution', 'My contribution'],
    ['solution', 'Solution'],
    ['decisions-and-trade-offs', 'Decisions and trade-offs'],
    ['validation-and-outcomes', 'Validation and outcomes'],
    ['what-i-learned', 'What I learned'],
]

export default function ProjectDetail() {
    const { slug } = useParams()
    const project = getProjectBySlug(slug)
    const isPublished = project?.caseStudyStatus === 'published'
    usePageMetadata(
        isPublished
            ? {
                  title: `${project.title} | Yousuf Shahzad`,
                  description: project.summary,
                  url: `https://yousuf.sh/projects/${project.slug}/`,
                  image: project.coverImage,
                  imageAlt: project.coverImageAlt || project.title,
                  type: 'article',
                  structuredData: {
                      '@context': 'https://schema.org',
                      '@type': 'CreativeWork',
                      headline: project.title,
                      description: project.summary,
                      url: `https://yousuf.sh/projects/${project.slug}/`,
                      image: project.coverImage
                          ? `https://yousuf.sh${project.coverImage}`
                          : undefined,
                      dateModified: project.updatedAt,
                      author: {
                          '@id': 'https://yousuf.sh/#person',
                      },
                      keywords: project.technologies?.join(', '),
                  },
              }
            : {
                  title: 'Project not found | Yousuf Shahzad',
                  description: 'This project page is not available.',
                  url: `https://yousuf.sh/projects/${slug}/`,
                  noIndex: true,
              }
    )

    if (!project)
        return (
            <PageTransition className="min-h-screen px-8 lg:px-24 pt-32">
                <h1 className="title text-5xl mb-5">PROJECT NOT FOUND</h1>
                <p className="text-gray-600 mb-8">
                    This project does not exist.
                </p>
                <Link className="underline underline-offset-4" to="/projects">
                    Back to projects
                </Link>
            </PageTransition>
        )

    if (!isPublished)
        return (
            <PageTransition className="min-h-screen px-8 lg:px-24 pt-32">
                <h1 className="title text-5xl mb-5">CASE STUDY IN PROGRESS</h1>
                <p className="text-gray-600 max-w-xl mb-8">
                    The catalogue entry for {project.title} is available, but
                    its evidence-backed case study has not been published yet.
                </p>
                <Link className="underline underline-offset-4" to="/projects">
                    Back to projects
                </Link>
            </PageTransition>
        )

    const related = getPublishedRelatedProjects(project.relatedProjects)
    return (
        <PageTransition className="relative min-h-screen">
            <ScrollProgress />
            <div className="px-6 md:px-12 lg:px-24 pt-24 pb-16 max-w-7xl mx-auto">
                <Link
                    to="/projects"
                    className="inline-flex mb-10 underline underline-offset-4"
                >
                    ← Back to projects
                </Link>
                <header className="max-w-4xl mb-10">
                    <h1 className="title text-5xl md:text-7xl leading-tight mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600">
                        {project.summary}
                    </p>
                </header>
                {project.coverImage && (
                    <figure className="mb-10">
                        <ProjectCover
                            project={project}
                            loading="eager"
                            className="max-h-[32rem] rounded-lg"
                        />
                        {project.coverImageCaption && (
                            <figcaption className="mt-3 text-sm text-gray-500">
                                {project.coverImageCaption}
                            </figcaption>
                        )}
                    </figure>
                )}
                <ProjectFacts project={project} />
                <ProjectLinks links={project.links} className="mb-12" />
                <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
                    <TableOfContents
                        headings={requiredSections.map(([id, label]) => ({
                            id,
                            label,
                        }))}
                    />
                    <article className="project-content">
                        <MarkdownContent content={project.body} />
                    </article>
                </div>
                {related.length > 0 && (
                    <section className="mt-16 border-t pt-10">
                        <h2 className="title text-3xl mb-6">
                            RELATED PROJECTS
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {related.map((item) => (
                                <li key={item.slug}>
                                    <Link
                                        className="underline underline-offset-4"
                                        to={`/projects/${item.slug}`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section className="mt-16 border-t pt-10">
                    <h2 className="title text-3xl mb-4">
                        LET&apos;S WORK TOGETHER
                    </h2>
                    <Link
                        className="underline underline-offset-4"
                        to="/contact"
                    >
                        Get in touch →
                    </Link>
                </section>
            </div>
        </PageTransition>
    )
}
