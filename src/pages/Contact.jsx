import PageTransition from '../components/PageTransition'
import ScrollProgress from '../components/ScrollProgress'
import usePageMetadata from '../hooks/usePageMetadata'

const contacts = [
    { mark: '@', href: 'mailto:contact@yousuf.sh', label: 'contact@yousuf.sh' },
    {
        mark: 'G',
        href: 'https://github.com/yousuf-shahzad',
        label: 'github.com/yousuf-shahzad',
    },
    {
        mark: 'in',
        href: 'https://linkedin.com/in/yousuf-sh',
        label: 'linkedin.com/in/yousuf-sh',
    },
]

export default function Contact() {
    usePageMetadata({
        title: 'Contact | Yousuf Shahzad',
        description:
            'Get in touch with Yousuf Shahzad for collaborations, projects, or a conversation about technology.',
        url: 'https://yousuf.sh/contact/',
    })
    return (
        <PageTransition className="relative min-h-screen">
            <ScrollProgress />
            <div className="px-5 sm:px-8 lg:px-24 pt-24 sm:pt-32 lg:pt-40 mb-14 sm:mb-20">
                <h1 className="text-5xl sm:text-6xl md:text-8xl title mb-6">
                    GET IN TOUCH
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                    Let&apos;s collaborate on something amazing. Whether you
                    have a project in mind or just want to say hello, I&apos;d
                    love to hear from you.
                </p>
            </div>
            <div className="px-5 sm:px-8 lg:px-24 py-10 sm:py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">
                            Contact information
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Feel free to reach out through any of these
                            channels:
                        </p>
                        <div className="space-y-6">
                            {contacts.map((contact) => (
                                <a
                                    key={contact.href}
                                    href={contact.href}
                                    target={
                                        contact.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel={
                                        contact.href.startsWith('http')
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className="group flex items-center space-x-4 text-lg hover:text-gray-600"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                        {contact.mark}
                                    </span>
                                    <span>{contact.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>
                    <section className="space-y-6 p-5 sm:p-8 rounded-lg shadow-lg bg-white">
                        <h2 className="text-2xl font-bold">
                            Reach out directly
                        </h2>
                        <p className="text-gray-600">
                            I prefer email, so if you send a message, I&apos;ll
                            reply as soon as I can.
                        </p>
                        <a
                            href="mailto:contact@yousuf.sh"
                            className="inline-block group px-6 py-3 mt-5 border-2 border-black bg-black text-white text-lg rounded hover:bg-gray-800 transition"
                        >
                            Email me{' '}
                            <span className="ml-2 group-hover:ml-6 duration-500">
                                →
                            </span>
                        </a>
                    </section>
                </div>
            </div>
        </PageTransition>
    )
}
