# Mono Studio

Mono Studio is a production-ready UI component studio for original React components.

The project is built to make component authoring and documentation repeatable:

- Browse components from a central registry
- Preview real behavior in interactive demos
- Inspect source code
- Copy usage snippets quickly
- Extend the studio with additional components over time

The studio includes ten documented components. Recall Dock adds a reusable
receipt trail for reversible actions: each item can be undone or dismissed
independently, and the host app owns the action history.

Snake Toast appears at the bottom right with a slithering entrance, a moving
border trace, and an exit within three seconds. Its white, black, red, and green
palettes include a white background with black text by default. The component
portals to the document body and respects reduced motion preferences.

Snake Spinner provides Orbit, Coil, and Chase shapes for inline status, loading
buttons, and a modal page overlay. It includes six colors plus inherited color,
three sizes, loading labels, and reduced motion support. The overlay dims the
page and blocks background interaction while the host application's work runs.

StudioCard is the studio's signature content frame, with an indexed shoulder,
clipped corner, and offset backing. The same implementation powers the home
catalog, library cards, and its interactive showcase. It supports live previews,
images, content, actions, badges, compact spacing, and inverse surfaces. Its
companion CSS Module is included in the automatically synced documentation.

StudioDataTable is a perforated data folio, with an inked column band, layered
paper edges, and expandable record slips for custom details and controls. Its
numbered rail, selection across pages, and sheet progress track frame real data.
Typed columns separate
raw search/sort values from custom cells. It includes numeric and text sorting,
search, page selection, pagination, compact spacing, and loading/empty states.
The showcase includes a real CSV export and controlled selection. Full source,
styles, props, and application examples are included in its component guides.

Foldout reveals content as indexed sheets with folded corners and an inked open
state. It supports single or multiple open sheets, controlled or internal state,
paper and inverse surfaces, compact spacing, keyboard navigation, and reduced
motion. Closed panels stay mounted to preserve form state, while remaining
inert and hidden from assistive technology. Its live example includes working
preferences; complete source, styles, and usage are available in its guides.

## Design Direction

- Monochrome visual system (black, white, grayscale)
- Minimal, technical presentation
- Strong typography hierarchy
- Subtle borders and restrained motion
- Light and dark mode with consistent identity

## Tech Stack

- Next.js (App Router)
- TypeScript (strict)
- React
- Tailwind CSS
- ESLint
- npm

## Local Setup

1. Install dependencies:

	 npm install

2. Start development server:

	 npm run dev

3. Open the app:

	 http://localhost:3000

## Scripts

- npm run dev: Run local development server
- npm run lint: Run ESLint checks
- npm run build: Create production build
- npm run start: Serve production build

## Folder Structure

~~~text
src/
	app/
		components/
			[slug]/
				page.tsx
			page.tsx
		globals.css
		layout.tsx
		page.tsx
	components/
		studio/
			code-viewer.tsx
			component-doc-page.tsx
			component-preview.tsx
			copy-button.tsx
			props-table.tsx
			*-showcase.tsx
			studio-header.tsx
			studio-shell.tsx
			studio-sidebar.tsx
			theme-toggle.tsx
		ui/
			*.tsx
	data/
		components.ts
		*-code.ts
		component-sources.json
		component-setup.ts
	lib/
		utils.ts
~~~

## Adding Another Component

1. Create UI component in src/components/ui.
2. Create an interactive demo + variants section in src/components/studio.
3. Register metadata in src/data/components.ts.
4. Add source/usage snippets in src/data and register them in components.ts.
5. Ensure route /components/[slug] resolves the new showcase.
6. Include use cases, component-specific guidelines, and state guidance in the registry. The Documentation and How to use links appear on every card and preview page.
7. Verify /docs/components/[slug] and /docs/components/[slug]/usage. Each usage page includes setup, complete source, required styles, and application code.
8. Run npm run sync:sources after changing source. It also runs automatically before npm run dev and npm run build.
9. Run npm run lint and npm run build.

## Deployment (Vercel)

Recommended workflow:

1. Push repository to GitHub (main branch)
2. Import repo into Vercel
3. Vercel auto-detects Next.js
4. Deploy from main

No environment variables are required for version one.

## Contribution Expectations

- Keep TypeScript strict and avoid dead code
- Favor reusable composition over page-specific hacks
- Preserve accessibility semantics and keyboard support
- Keep styles consistent with the monochrome system
- Add docs metadata and examples for any new component
- Ensure lint/build pass before opening a PR

## Originality Principle

Mono Studio components must be authored from first principles.

- Do not copy implementation code from external UI libraries
- Do not clone styles or interactions component-for-component
- Reuse only general engineering patterns, not library-specific code
- Any new component should have a distinct behavior or interaction model
