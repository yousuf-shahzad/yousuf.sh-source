import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBlogs, getAllTags, formatDate } from '../utils/blogUtils'
import { Arrow, ButtonLink, PageIntro } from '../components/Primitives'
export default function Blog() {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const blogs = getAllBlogs()
  const query = search.trim().toLowerCase()
  const filtered = blogs.filter(
    ({ frontmatter }) =>
      (!selectedTag || frontmatter.tags.includes(selectedTag)) &&
      [frontmatter.title, frontmatter.excerpt, ...frontmatter.tags]
        .join(' ')
        .toLowerCase()
        .includes(query),
  )
  return (
    <>
      <PageIntro
        eyebrow="Writing / Notes along the way"
        title="Thinking out loud."
      >
        <p>Things I’m learning about software, design, and how systems work.</p>
      </PageIntro>
      {blogs.length ? (
        <section className="writing-list" aria-label="Articles">
          <div className="search-row">
            <label htmlFor="article-search">
              Search articles
              <input
                id="article-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="A topic, title, or idea"
              />
            </label>
            <div className="filter-tags" aria-label="Filter by topic">
              {['', ...getAllTags()].map((tag) => (
                <button
                  key={tag}
                  aria-pressed={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag || 'All topics'}
                </button>
              ))}
            </div>
          </div>
          <p role="status" className="eyebrow">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
          </p>
          {filtered.map((blog) => (
            <Link
              className="article-row"
              key={blog.slug}
              to={`/blog/${blog.slug}`}
            >
              <span>{formatDate(blog.frontmatter.date)}</span>
              <div>
                <h2>{blog.frontmatter.title}</h2>
                <p>{blog.frontmatter.excerpt}</p>
              </div>
              <Arrow />
            </Link>
          ))}
          {!filtered.length && (
            <div className="empty-state">
              <h2>No matching articles.</h2>
              <p>Try another search or topic.</p>
              <button
                className="button button-secondary"
                onClick={() => {
                  setSearch('')
                  setSelectedTag('')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="empty-state">
          <h2 className="display">A notebook in the making.</h2>
          <p>
            No articles just yet. In the meantime, my projects are the best
            place to see what I’ve been exploring.
          </p>
          <ButtonLink to="/projects">Explore the projects</ButtonLink>
        </section>
      )}
    </>
  )
}
