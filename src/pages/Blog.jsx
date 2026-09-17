import { useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition'
import ScrollProgress from '../components/ScrollProgress'
import BlogCard from '../components/BlogCard'
import usePageMetadata from '../hooks/usePageMetadata'
import { getAllBlogs, getAllTags } from '../utils/blogUtils'

export default function Blog() {
    usePageMetadata({
        title: 'Blog | Yousuf Shahzad',
        description:
            'Notes by Yousuf Shahzad on building software, learning computer science, and solving problems.',
        url: 'https://yousuf.sh/blog/',
    })
    const [query, setQuery] = useState('')
    const [tag, setTag] = useState('')
    const posts = getAllBlogs()
    const tags = getAllTags()
    const filtered = useMemo(
        () =>
            posts.filter(
                (post) =>
                    (!tag || post.frontmatter.tags?.includes(tag)) &&
                    `${post.frontmatter.title || ''} ${post.frontmatter.excerpt || ''}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
            ),
        [posts, query, tag]
    )
    return (
        <PageTransition className="relative min-h-screen">
            <ScrollProgress />
            <div className="px-5 sm:px-8 lg:px-24 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16">
                <h1 className="text-5xl sm:text-6xl md:text-8xl title mb-6">
                    BLOG
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                    Notes on building, learning and problem-solving.
                </p>
            </div>
            <div className="px-5 sm:px-8 lg:px-24 pb-16 sm:pb-20">
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <label className="sr-only" htmlFor="blog-search">
                        Search posts
                    </label>
                    <input
                        id="blog-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-black"
                        placeholder="Search posts"
                    />
                    <label className="sr-only" htmlFor="blog-tag">
                        Filter by tag
                    </label>
                    <select
                        id="blog-tag"
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-black"
                    >
                        <option value="">All tags</option>
                        {tags.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {(query || tag) && (
                        <button
                            type="button"
                            className="rounded-full border border-gray-300 px-5 py-3 transition hover:border-black hover:bg-white"
                            onClick={() => {
                                setQuery('')
                                setTag('')
                            }}
                        >
                            Clear search
                        </button>
                    )}
                </div>
                {filtered.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {filtered.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-10 text-center">
                        <h2 className="text-2xl font-bold mb-2">
                            No posts found
                        </h2>
                        <p className="text-gray-600">
                            Try a different search or filter.
                        </p>
                    </div>
                )}
            </div>
        </PageTransition>
    )
}
