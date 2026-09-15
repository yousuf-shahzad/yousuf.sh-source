# Publishing an article

Copy the following into `src/data/blogs/your-article-slug.md`.
Set `published: true` only when the article is ready. Dates use YYYY-MM-DD.
The title is rendered separately, so article headings start at `##`.

```markdown
---
title: What I learned building a small tool
date: '2026-09-15'
excerpt: A short, specific description of the article.
tags: [Python, Projects]
published: false
---

## The starting point

Write your article here. Inline `code`, fenced code blocks, lists, and tables are supported.
```

Optional image fields: `headerImage` (a local public path or HTTPS URL) and
`headerImageAlt` (required if an image is supplied). Raw HTML is displayed as text,
not executed. The build derives reading time, the sitemap, and page metadata.

Run `npm run content:build` while developing after editing an article, or restart
the dev server. Production builds always regenerate the content.
