import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/blogUtils'

export default function BlogCard({ post, variant = 'listing' }) {
    const compact = variant === 'related'
    return (
        <article className="group overflow-hidden rounded-xl border border-transparent bg-white shadow-lg transition-[border-color,background-color,box-shadow] duration-300 hover:border-black hover:bg-gray-50 hover:shadow-md">
            <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {post.frontmatter.headerImage ? (
                        <img
                            src={post.frontmatter.headerImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div
                            className="flex h-full w-full items-end justify-between bg-[#e9e9e9] p-5 text-black"
                            aria-hidden="true"
                        >
                            <span className="title text-3xl leading-none">
                                Notes
                            </span>
                            <span className="text-xs font-medium tracking-[0.2em] text-black/50">
                                Y.SH
                            </span>
                        </div>
                    )}
                </div>
                <div className={compact ? 'p-4' : 'p-6'}>
                    <p className="text-sm text-gray-500 mb-2">
                        {formatDate(post.frontmatter.date)}
                    </p>
                    <h3
                        className={`font-bold text-gray-900 group-hover:text-gray-700 ${compact ? '' : 'text-xl mb-3'}`}
                    >
                        {post.frontmatter.title}
                    </h3>
                    {!compact && (
                        <>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {post.frontmatter.excerpt || post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {post.frontmatter.tags
                                    ?.slice(0, 2)
                                    .map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </article>
    )
}

BlogCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        frontmatter: PropTypes.shape({
            headerImage: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string.isRequired,
            excerpt: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
    }).isRequired,
    variant: PropTypes.string,
}
