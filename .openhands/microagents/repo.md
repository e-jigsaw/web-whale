---
name: repo
type: repo
agent: CodeActAgent
---

Repository: <-- REPLACE -->

Description: <-- REPLACE -->

Directory Structure:

- src/: Main application source code

Setup:

- To set up the project, run `pnpm install` to install the dependencies.
- `pnpm dev` for development.

Commands:

- `pnpm install`: Installs dependencies.
- `pnpm dev`: Starts the local development server.
- `pnpm build`: Builds the production site.
- `pnpm preview`: Preview the production build locally.
- `pnpm lint`: Run ESLint for code linting.

Technologies:

- React 18
- TypeScript
- Vite
- TailwindCSS
- ESLint

Guidelines:

- The project uses TypeScript for type safety.
- TailwindCSS is used for styling.
- ESLint is configured for code quality.
- When running `pnpm dev`, use the specified port from the runtime information.
- Before creating a pull request, document session changes in `docs/sessions/` following the format in `docs/instruction.md`.
