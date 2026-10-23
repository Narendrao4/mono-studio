<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Required component workflow

For every component added to Mono Studio:

- Implement the reusable UI and an interactive showcase.
- Register its preview, full source, usage example, props, use cases, state guidance, and component-specific guidelines.
- Provide the Documentation and How to use links at the end of its homepage card, library entry, and component preview page using ComponentGuideLinks.
- Keep /docs/components/[slug] and /docs/components/[slug]/usage available for that component. The usage guide must cover setup, required styles, imports, and application code.
- Run npm run sync:sources after source changes. The dev and build scripts also sync sources so the documentation shows the actual implementation.
- Verify lint, the production build, and behavior affected by the change before publishing. Keep this documentation workflow for future component requests.
