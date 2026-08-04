## The Base e.V.

Website project for The Base e.V. in Aachen.

## GitHub CLI

This repo includes a project wrapper around GitHub CLI for common repository workflows.

```bash
npm run gh -- help
npm run gh -- doctor
npm run gh -- status
npm run gh -- pr create --draft --fill
```

Detailed usage lives in [docs/github-cli.md](./docs/github-cli.md).

## Getting Started

Run the local development server:

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) or [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Project Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Sanity Studio under `/studio`

The project is intended to run with the standard Next.js development and production workflow. There are no hosting-platform-specific build helpers required for local development.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
