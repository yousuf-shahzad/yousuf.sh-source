import projects from '../generated/projects.json'

export const getAllProjects = () => projects
export const getProjectBySlug = (slug) =>
    projects.find(
        (project) =>
            project.slug === slug || project.legacySlugs?.includes(slug)
    )
export const getPublishedProjectBySlug = (slug) => {
    const project = getProjectBySlug(slug)
    return project?.caseStudyStatus === 'published' ? project : undefined
}
export const getPublishedRelatedProjects = (slugs = []) =>
    slugs.map(getPublishedProjectBySlug).filter(Boolean)
