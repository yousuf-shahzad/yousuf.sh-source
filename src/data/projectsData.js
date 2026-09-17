import { getAllProjects } from '../utils/projectUtils'

export default getAllProjects().map(({ summary, ...project }) => ({
    ...project,
    description: summary,
}))
