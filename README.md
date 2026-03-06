# bertik.net

Personal website and publication hub for **Herbert Ulrich**, built with [Astro](https://astro.build/).

This repository contains the source code for https://bertik.net, including:

- a homepage and about page,
- blog-style updates,
- publication entries,
- RSS and SEO metadata,
- generated search index for static search.

## Project purpose

This project is not a reusable website template. It is the maintained source for Herbert Ulrich’s personal web presence.

Content, wording, and media should stay personal and factual:

- no placeholder text,
- no stock “template” copy,
- no generic demo content,
- no unrelated branding.

## Tech stack

- Astro
- TypeScript
- Tailwind CSS
- Pagefind (static search)

## Local development

```bash
pnpm install
pnpm run dev
```

The site runs locally at `http://localhost:4321` by default.

## Build

```bash
pnpm run build
pnpm run preview
```

`pnpm run build` performs:

1. Astro type/content checks
2. production build
3. Pagefind indexing
4. copy of the generated search assets into `public/pagefind`

## Common commands

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `pnpm run dev`          | Start local dev server                       |
| `pnpm run build`        | Run checks + build + search index generation |
| `pnpm run preview`      | Preview built site                           |
| `pnpm run lint`         | Run ESLint                                   |
| `pnpm run format:check` | Check formatting                             |
| `pnpm run format`       | Apply formatting                             |
| `pnpm run sync`         | Regenerate Astro types                       |

## Content locations

- Main page routes: `src/pages/`
- Posts and publication entries: `src/data/blog/`
- Site-level configuration: `src/config.ts`
- UI building blocks: `src/components/`, `src/layouts/`

## Contribution policy

External contributions are welcome for clear fixes (typos, broken links, factual corrections, accessibility improvements, bug fixes).

For larger structural/content changes, please open an issue first so changes can be aligned with the site owner’s intent.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Acknowledgement

This project was originally bootstrapped from the AstroPaper theme and has since been adapted for Herbert Ulrich’s personal website.

## License

MIT License. See [LICENSE](LICENSE).
