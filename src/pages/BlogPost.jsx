import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import MarkdownContent from '../components/content/MarkdownContent'
import ScrollProgress from '../components/ScrollProgress'
import BlogCard from '../components/BlogCard'
import usePageMetadata from '../hooks/usePageMetadata'
import { formatDate, getBlogBySlug, getRecentBlogs } from '../utils/blogUtils'

export default function BlogPost() {
    const { slug } = useParams()
    const blog = getBlogBySlug(slug)
    usePageMetadata(
        blog
            ? {
                  title: `${blog.frontmatter.title} | Yousuf Shahzad`,
                  description: blog.frontmatter.excerpt,
                  url: `https://yousuf.sh/blog/${blog.slug}/`,
                  image: blog.frontmatter.headerImage,
                  imageAlt: blog.frontmatter.title,
                  type: 'article',
                  noIndex: blog.frontmatter.noIndex,
                  structuredData: {
                      '@context': 'https://schema.org',
                      '@type': 'BlogPosting',
                      headline: blog.frontmatter.title,
                      description: blog.frontmatter.excerpt,
                      url: `https://yousuf.sh/blog/${blog.slug}/`,
                      image: blog.frontmatter.headerImage
                          ? `https://yousuf.sh${blog.frontmatter.headerImage}`
                          : undefined,
                      datePublished: blog.frontmatter.date,
                      author: {
                          '@id': 'https://yousuf.sh/#person',
                      },
                      keywords: blog.frontmatter.tags?.join(', '),
                  },
              }
            : {
                  title: 'Blog post not found | Yousuf Shahzad',
                  description: 'This blog post is not available.',
                  url: `https://yousuf.sh/blog/${slug}/`,
                  noIndex: true,
              }
    )
    if (!blog)
        return (
            <PageTransition className="min-h-screen grid place-items-center px-8">
                <div className="text-center">
                    <h1 className="title text-4xl mb-3">BLOG POST NOT FOUND</h1>
                    <p className="text-gray-600 mb-6">
                        The post you&apos;re looking for does not exist.
                    </p>
                    <Link className="underline underline-offset-4" to="/blog">
                        Back to blog
                    </Link>
                </div>
            </PageTransition>
        )
    const related = getRecentBlogs(4)
        .filter((post) => post.slug !== blog.slug)
        .slice(0, 3)
    return (
        <PageTransition className="relative min-h-screen">
            <ScrollProgress />
            <div className="px-6 md:px-12 lg:px-24 pt-24 pb-16 max-w-6xl mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex mb-10 underline underline-offset-4"
                >
                    ← Back to blog
                </Link>
                {blog.frontmatter.headerImage && (
                    <img
                        src={blog.frontmatter.headerImage}
                        alt=""
                        className="w-full max-h-96 object-cover rounded-lg mb-10"
                    />
                )}
                <article className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl title leading-tight mb-6">
                            {blog.frontmatter.title}
                        </h1>
                        <p className="text-gray-600 mb-5">
                            {formatDate(blog.frontmatter.date)} ·{' '}
                            {blog.frontmatter.readTime}
                            {blog.frontmatter.author
                                ? ` · By ${blog.frontmatter.author}`
                                : ''}
                        </p>
                        {blog.frontmatter.excerpt && (
                            <p className="text-xl text-gray-700">
                                {blog.frontmatter.excerpt}
                            </p>
                        )}
                        {blog.frontmatter.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {blog.frontmatter.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>
                    <div className="project-content">
                        <MarkdownContent content={blog.content} />
                    </div>
                </article>
                {related.length > 0 && (
                    <section className="mt-16 pt-12 border-t">
                        <h2 className="title text-3xl mb-8">MORE ARTICLES</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    variant="related"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </PageTransition>
    )
}
