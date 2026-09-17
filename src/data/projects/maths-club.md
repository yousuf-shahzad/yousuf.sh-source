---
slug: maths-club
legacySlugs: [maths-club-website]
title: Maths Club Website
summary: A comprehensive web application for Upton Court Grammar School's Maths Society, designed to enhance mathematical engagement through challenges, leaderboards, and newsletter systems. Built using Flask and Jinja templating, the website provides an interactive platform for students to explore and excel in mathematics.
caseStudyStatus: published
projectStatus: Complete
role: Full-stack developer
team: [Worked with another classmate]
period: School society platform
technologies: [Python, Flask, Jinja, PostgreSQL, Sphinx]
links:
    demo: https://ucgsmaths.com
    github: https://github.com/yousuf-shahzad/maths-soc-source
updatedAt: 2026-09-17
relatedProjects: []
coverImage: /projects/maths-club/cover.jpg
coverImageAlt: An image of the Maths Society website's homepage.
coverImageWidth: 1600
coverImageHeight: 500
coverImageCaption: The homepage of the Maths Society website.
---

## Problem
The mathematics society at the school needed a better way to organise, issue and receive responses for weekly challenges and notices regarding activities in the society. Seeking a more unified, and easier to manage way to move out of their outdated letterbox system, they sought to digitise it in the form of a website which would be a platform for students and teachers alike to easily access the challenges and information regarding the society.
  

  

## My contribution
I designed and built the Flask application, including the server rendered interface, the challenge systems, leaderboard state and all the newsletter-oriented content. This included both the user facing pages, underlying data models and the backend admin dashboards. All of the pages had to be created for a non-technical user to be use them, which we accounted for in the design. 
  Alongside this, I set up all of the hosting for the application. This included configuring anything pertaining to domain and DNS, alongside setting up a VPS running Nginx and the WSGI server for the application.
  

## Solution
The final product allows for easy creation of challenges by an admin user which can be answered by a user; once this happens, the leaderboard automatically updates in real time to reflect actual user data and leaderboard state. It also allows for release of articles, newsletters and announcements directly to the page for all users to see easily. The site is on Flask and Jinja, backed by PostgreSQL ensuring any persistent data is stored whilst our server rendered approach ensures the pages are easy to deploy and use. 

## Decisions and trade-offs

One of the main reasons we decided to use Flask and Jinja for the website was simply because of our existing technical experience. Both me and my classmate were already comfortable using Python, but had fairly limited experience with other web frameworks and languages. Since the society wanted the website to be delivered before Christmas, learning an entirely new stack solely for the project would have taken up a significant amount of development time and introduced more risk than we really needed.

Flask and Jinja also kept a lot of the project relatively simple. Most of the website could be handled through normal server-side flows, meaning we did not have to build a particularly complex frontend or rely heavily on JavaScript. This worked quite well for the actual requirements of the website, as most of the functionality revolved around things such as submitting answers, displaying challenges, updating leaderboards and allowing admins to manage content. We also did not need many social or user-to-user features, so there was not much reason to build the website around a heavily interactive frontend.

There were some drawbacks to this approach. Some parts of the website could have felt more responsive if more of the interactions were handled on the client rather than requiring another request to the server. If I was building the website again, I would probably still keep Flask for most of the backend, but use client-side functionality more selectively in places where it would actually improve the experience rather than changing the entire stack.

I made a similar decision when it came to hosting. Instead of splitting the application between several different managed services, I hosted everything on my own VPS. The application, database, Nginx configuration and WSGI server were all managed from the same server, while I also handled the domain and DNS configuration myself. For a website of this scale, this made deployment much easier to understand and maintain, while also giving me much more control over how everything was configured.

The obvious disadvantage of this was that it placed most of the infrastructure in one place. If the VPS went down, then effectively the entire website went down with it, and things such as backups, updates, security and general maintenance were also my responsibility. For the number of users we were expecting this was a reasonable trade-off, especially when compared to adding more infrastructure and complexity for very little practical benefit. For a much larger application, however, I would probably separate some of these services or make greater use of managed infrastructure to reduce the reliance on a single server.
  

## Validation and outcomes

 
The website was deployed for use across the school and remained in active use by the Maths Society, eventually reaching over 120 registered user accounts from a school of more than 1,200 students. Students were able to submit answers to weekly challenges through the site, with these submissions feeding directly into the leaderboard system, while society leaders could manage challenges, articles and newsletters without needing to make changes to the underlying code.

One of the more useful forms of validation came from the fact that the website replaced an existing process rather than simply being built as a demonstration. It had to work reliably enough for the society to use it as part of its normal activities, and changes to the platform were often driven by feedback from the students and teachers actually using it.

The project also gave me experience maintaining a live application after deployment. Issues were no longer limited to whether something worked locally; I also had to consider deployment, database changes, server configuration and the effect that updates could have on existing users and data.

  

## What I learned

This project was one of my first experiences building something that had actual users rather than being developed purely as a personal project. It made me think much more carefully about usability, reliability and whether a feature was genuinely useful rather than just technically interesting.

I also learned a lot from having responsibility for the deployment and maintenance of the website. Running the application on a VPS meant becoming comfortable with areas such as Nginx, WSGI servers, DNS, database migrations and general Linux server administration, which were all things I had relatively little experience with before the project.

Probably the biggest lesson was that keeping a system simple is often more useful than choosing the most modern or technically impressive approach. Flask and server-side rendering were not necessarily the most sophisticated option available, but they allowed us to deliver the website within the society's timeframe and made the system straightforward enough for us to maintain afterwards.