import { site, skills } from '../data/site'
import { PageIntro } from '../components/Primitives'
import ContactCallout from '../components/ContactCallout'
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About / The person behind the projects"
        title="Always asking how."
      >
        <p>
          I’m Yousuf, a Computer Science student at UCL. I enjoy taking things
          apart, understanding the decisions behind them, and finding my own way
          to build.
        </p>
      </PageIntro>
      <div className="about-layout">
        <aside className="about-note">
          <span className="display">Y.SH</span>
          <p>{site.education}</p>
          <p className="eyebrow">{site.location}</p>
        </aside>
        <div className="about-story">
          <section>
            <h2 className="display">It started with a countdown.</h2>
            <p>
              As a child, I wondered how the websites I visited actually worked.
              My mother bought me a book about Scratch, followed by another on
              HTML and CSS. My first project was a simple birthday countdown.
            </p>
            <p>
              That curiosity has stayed with me. Today it takes me from web
              applications and automation to the coordination problems behind
              distributed systems.
            </p>
          </section>
          <section>
            <h2 className="display">A new chapter at UCL.</h2>
            <p>
              I’ve completed my A-levels and am beginning my first year of
              Computer Science. I’m looking forward to more depth, new
              perspectives, and building things with other people.
            </p>
            <dl className="education-results">
              {[
                ['Mathematics', 'A*'],
                ['Further Mathematics', 'A*'],
                ['Computer Science', 'A'],
                ['EPQ on AES', 'A*'],
              ].map(([subject, grade]) => (
                <div key={subject}>
                  <dt>{subject}</dt>
                  <dd>{grade}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="display">Beyond the editor.</h2>
            <p>
              Video editing and graphic design give me another way to make
              things. Sport brings out my competitive side. I’m usually
              experimenting with a new tool or following a question a little
              further than I expected.
            </p>
          </section>
        </div>
      </div>
      <section className="section" aria-labelledby="toolkit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A working toolkit</p>
            <h2 id="toolkit" className="display section-title">
              Tools & interests.
            </h2>
          </div>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, values]) => (
            <div key={category}>
              <h3 className="eyebrow">{category}</h3>
              <ul>
                {values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <ContactCallout />
    </>
  )
}
