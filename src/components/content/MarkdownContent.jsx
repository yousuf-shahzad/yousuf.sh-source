import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import PropTypes from 'prop-types'

function headingId(children) {
    return String(children)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

MarkdownContent.propTypes = { content: PropTypes.string.isRequired }

export default function MarkdownContent({ content }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ children }) => (
                    <h2 id={headingId(children)}>{children}</h2>
                ),
                h2: ({ children }) => (
                    <h2 id={headingId(children)}>{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 id={headingId(children)}>{children}</h3>
                ),
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={
                            href?.startsWith('http')
                                ? 'noopener noreferrer'
                                : undefined
                        }
                    >
                        {children}
                    </a>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
