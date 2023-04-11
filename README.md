Project Overview
================

Introduction
------------



Ever had a brilliant idea but felt overwhelmed by the countless options and dependencies? Worry no more! Introducing Instant Bun, your sleek and simplified solution for indie hacker apps.
Say goodbye to the cumbersome stacks of large companies, and hello to a toolkit designed to deliver lightning-fast experiences in your app. Built with hobbyists at heart, Instant Bun streamlines project building, putting the excitement and joy back into programming. 
Dive into a world where every design choice fuels your creative endeavors, and let the fun begin!
This project aims to build a fast, dependency-less app using the following technologies:

-   Bun
-   TypeScript
-   SQLite
-   ChatGPT
-   Formatting/Link tools (optional: Prettier)

The goal is to create an app and system for projects without relying on ANY external dependencies, just Bun itself

Some features of this project I have or will implement, in no particular order:
-  A CLI tool to create a new project (NOT STARTED)
- Code generators (STARTED - IN PROGRESS)
- Error handling (STARTED - IN PROGRESS)
- Data Fetching utilities (STARTED - IN PROGRESS)
- Files and Directory utilities (STARTED - IN PROGRESS)
- GPT Prompt Generators (STARTED - IN PROGRESS)
- Markdown and HTML utilities (STARTED - IN PROGRESS)
- SQLite utilities (STARTED - IN PROGRESS) (Bun HAS a SQLite module built in)
- Types and TypeSafety through TypeScript type inferencing
- Validation utilities(STARTED - IN PROGRESS)
- Web Page Rendering utilities(NOT STARTED)
- Web Server utilities(NOT START)

Note: WIP = Work in Progress, TODO = To Do


Getting Started
---------------

### Installation and Running

To install dependencies, run:

bashCopy code

`bun install`

To start the project, run:

bashCopy code

`bun run index.ts`

This project was initialized using `bun init` in bun v0.5.9. [Bun](https://bun.sh/) is a fast all-in-one JavaScript runtime.

### Project Goal

Build a fully function typsafe safe full stack web app with this technology stack, focusing on ease of use and quick response times. The frontend will be mostly static, but there may be ways to load CSS files and other assets. Maybe even SSR?? Fingers crossed

Limitations and Dependencies
----------------------------

The project has the following limitations:

-   Only Bun can be used as a dependency.
-   Everything should be built from scratch in a reusable way.
-   If something becomes overly complicated, create a new version.
-   Focus on learning and contributing to Bun.

Nice to Haves
------------

-   A Hot Module Replacement (HMR) style feature to reload the app whenever there's a change.

Project Structure and Ideas
---------------------------

Each idea should be its own module within the project. Modules should be modular, unit testable, and only export things that are worth using outside the module. They should be able to operate independently and may depend on each other. Maintain a flat hierarchy within modules.

### Modules

- cli-utils
- fetcher
- sqlite-interface
- types
- validations
- web-page-render
### Note

-   Separate API routes by `/api` for the web server. Anything else can be considered page routes.

Project Motivation
------------------

The motivation behind this project is to improve development processes and learn more about Bun.

Install in your bun app

```bash
bun add https://github.com/brandon-schabel/instant-bun
```


then import into your module


```jsx
import { fetchUtils } from 'instant-bun'
```

watch tests
`bun --watch test`

