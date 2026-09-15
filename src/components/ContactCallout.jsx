import { site } from '../data/site'
import { Arrow } from './Primitives'
export default function ContactCallout() {
  return (
    <section
      className="contact-callout"
      aria-labelledby="contact-callout-title"
    >
      <div>
        <p className="eyebrow">Have something in mind?</p>
        <h2 className="display" id="contact-callout-title">
          Let’s talk.
        </h2>
      </div>
      <a href={`mailto:${site.email}`} className="contact-callout-link">
        {site.email}
        <Arrow />
      </a>
    </section>
  )
}
