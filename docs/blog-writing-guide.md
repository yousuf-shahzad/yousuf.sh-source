# blawg

```md
---
slug: lowercase-kebab-case-title
title: A clear, specific title
date: 2026-09-17
tags: [Learning, Projects]
published: false
excerpt: One or two sentences explaining why the post is worth reading.
---

your draft goes here
```

- set `published: false` while writing; drafts are checked by `npm run content` but do not appear on the site
- set `published: true` only when the post is ready to share
- tags should be short and consistent so they remain useful as filters
- add images to `public/blog/<slug>/`
- before publishing, run `npm run content`, check every outbound link
