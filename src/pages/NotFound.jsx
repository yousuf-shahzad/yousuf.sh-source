import PropTypes from 'prop-types'
import { PageIntro, ButtonLink } from '../components/Primitives'
export default function NotFound({ kind = 'page' }) {
  const target =
    kind === 'project' ? '/projects' : kind === 'article' ? '/blog' : '/'
  const label =
    kind === 'project'
      ? 'Back to projects'
      : kind === 'article'
        ? 'Back to writing'
        : 'Back to home'
  return (
    <section className="not-found">
      <PageIntro eyebrow="404 / A little off course" title="Nothing here.">
        <p>
          This {kind} doesn’t exist, or may have moved. Let’s get you somewhere
          useful.
        </p>
      </PageIntro>
      <ButtonLink to={target}>{label}</ButtonLink>
    </section>
  )
}
NotFound.propTypes = { kind: PropTypes.oneOf(['page', 'project', 'article']) }
