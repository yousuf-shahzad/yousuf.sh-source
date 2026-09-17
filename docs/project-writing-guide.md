# Project case-study writing guide

each case study should

- write from verified evidence
- explain prob, my contribution, solution, decisions, validation, outcomes and what learned (only really reflect on me tho)
- state limits plainly

```md
## Problem

## My contribution

## Solution

## Decisions and trade-offs

## Validation and outcomes

## What I learned
```

- optional sections include
    - constraints
    - difficult moment
    - limitations
    - next steps

- add images to `public/projects/<slug>/` and include dimensions to avoid layout shift, add captions asw
- to use an image as a project cover, add this to the project frontmatter

```md
coverImage: /projects/<slug>/cover.jpg
coverImageAlt: What someone should notice in the image
coverImageWidth: 1600
coverImageHeight: 900
coverImageCaption: Optional context for the image.
```

- cover images show as a banner on project cards and at the top of a published case study
- before changing casestudystatus should
    - run `npm run content`
    - check every outbound link
    - make sure narrative is accurate
    - test direct `/projects/<slug>` URL on deployed host
