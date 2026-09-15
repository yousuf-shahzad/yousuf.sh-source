import { Link, useParams } from 'react-router-dom'
import { getBlogBySlug, formatDate } from '../utils/blogUtils'
import { PageIntro, TagList } from '../components/Primitives'
import NotFound from './NotFound'
export default function BlogPost() {
  const { slug } = useParams()
  const blog = getBlogBySlug(slug)
  if (!blog) return <NotFound kind="article" />
  return (
    <>
      <Link className="text-link back-link" to="/blog">
        ← All writing
      </Link>
      <PageIntro
        eyebrow={`${formatDate(blog.frontmatter.date)} / ${blog.frontmatter.readTime}`}
        title={blog.frontmatter.title}
      >
        <p>{blog.frontmatter.excerpt}</p>
      </PageIntro>
      <TagList tags={blog.frontmatter.tags} />
      {blog.frontmatter.headerImage && (
        <img
          className="article-image"
          src={blog.frontmatter.headerImage}
          alt={blog.frontmatter.headerImageAlt}
        />
      )}
      <article
        className="article-body"
        dangerouslySetInnerHTML={{ __html: blog.html }}
      />
      <Link className="text-link" to="/blog">
        ← Back to all writing
      </Link>
    </>
  )
}
