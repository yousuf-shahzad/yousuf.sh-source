import { useEffect } from 'react'

const siteUrl = 'https://yousuf.sh'
const defaults = {
    title: 'Yousuf Shahzad | Computer Science Student at UCL',
    description:
        'Portfolio of Yousuf Shahzad, a first-year Computer Science student at UCL, featuring projects, writing, and achievements.',
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    imageAlt: 'Yousuf Shahzad',
    type: 'website',
    robots: 'index, follow',
}

function absoluteUrl(value) {
    if (!value) return undefined
    return value.startsWith('http')
        ? value
        : new URL(value, `${siteUrl}/`).toString()
}

function setMeta(selector, content) {
    const element = document.head.querySelector(selector)
    if (element && content) element.setAttribute('content', content)
}

function setStructuredData(data) {
    const selector = 'script[data-page-structured-data]'
    const existing = document.head.querySelector(selector)
    if (!data) {
        existing?.remove()
        return
    }
    const script = existing || document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.pageStructuredData = 'true'
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c')
    if (!existing) document.head.append(script)
}

export default function usePageMetadata(metadata = {}) {
    const metadataKey = JSON.stringify(metadata)

    useEffect(() => {
        const values = { ...defaults, ...JSON.parse(metadataKey) }
        const image = absoluteUrl(values.image || defaults.image)
        const url = absoluteUrl(values.url)
        document.title = values.title
        setMeta('meta[name="description"]', values.description)
        setMeta(
            'meta[name="robots"]',
            values.noIndex ? 'noindex, follow' : values.robots
        )
        setMeta('meta[property="og:title"]', values.title)
        setMeta('meta[property="og:description"]', values.description)
        setMeta('meta[property="og:url"]', url)
        setMeta('meta[property="og:type"]', values.type)
        setMeta('meta[property="og:image"]', image)
        setMeta(
            'meta[property="og:image:alt"]',
            values.imageAlt || defaults.imageAlt
        )
        setMeta('meta[name="twitter:title"]', values.title)
        setMeta('meta[name="twitter:description"]', values.description)
        setMeta('meta[name="twitter:url"]', url)
        setMeta('meta[name="twitter:image"]', image)
        setMeta('meta[name="twitter:card"]', 'summary_large_image')
        document.head
            .querySelector('link[rel="canonical"]')
            ?.setAttribute('href', url)
        setStructuredData(values.structuredData)
    }, [metadataKey])
}
