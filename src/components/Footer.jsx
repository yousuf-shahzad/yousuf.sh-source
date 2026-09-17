import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { navigation } from '../data/siteData'

const socialLinks = [
    {
        icon: Github,
        href: 'https://github.com/yousuf-shahzad',
        label: 'GitHub',
    },
    {
        icon: Linkedin,
        href: 'https://linkedin.com/in/yousuf-sh',
        label: 'LinkedIn',
    },
    { icon: Mail, href: 'mailto:contact@yousuf.sh', label: 'Email' },
]

export default function Footer() {
    return (
        <footer className="mt-auto bg-[#171717] px-5 py-12 text-[#f4f4f4] sm:px-8 sm:py-16 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
                    <section className="md:col-span-5">
                        <h2 className="title text-5xl leading-none tracking-tight sm:text-6xl">
                            Y.SH
                        </h2>
                        <a
                            href="https://github.com/yousuf-shahzad/yousuf.sh-source"
                            className="mt-7 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm text-white transition-colors hover:border-white hover:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View source code{' '}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </section>

                    <nav
                        className="md:col-span-3"
                        aria-label="Footer navigation"
                    >
                        <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                            Explore
                        </h2>
                        <ul className="grid gap-3">
                            {navigation.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="group inline-flex items-center gap-2 text-base text-white/75 transition-colors hover:text-white"
                                    >
                                        <span className="text-xs text-white/35 transition-colors group-hover:text-white/70">
                                            {item.number}
                                        </span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <section className="md:col-span-4">
                        <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                            Connect
                        </h2>
                        <ul className="grid gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="group inline-flex items-center gap-3 text-base text-white/75 transition-colors hover:text-white"
                                        target={
                                            href.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            href.startsWith('http')
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                    >
                                        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-white/70">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        {label}
                                        {href.startsWith('http') && (
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="flex flex-col gap-3 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
                    <p>{new Date().getFullYear()} Yousuf Shahzad</p>
                    <p>built with &lt;3</p>
                </div>
            </div>
        </footer>
    )
}
