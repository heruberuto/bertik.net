# Contributing

Thanks for your interest in improving `bertik.net`.

This repository powers Herbert Ulrich’s personal website, so changes should prioritize correctness, clarity, and maintainability over feature volume.

## What contributions are useful

- typo/grammar fixes
- broken links and metadata fixes
- accessibility improvements
- bug fixes
- build/tooling reliability improvements

## What to avoid without prior discussion

- rewriting personal biography text or publication framing
- adding generic template sections/content
- adding stock/demo images
- broad visual redesigns unrelated to an issue

Please open an issue first for any non-trivial design or content changes.

## Development workflow

1. Fork and create a branch.
2. Make focused changes.
3. Run checks locally:
   - `pnpm run lint`
   - `pnpm run format:check`
   - `pnpm run build`
4. Submit a pull request with a clear description of:
   - what changed,
   - why it changed,
   - how it was verified.

## Content standards

- Keep content specific to Herbert Ulrich and his work.
- Prefer original wording over inherited template language.
- Ensure dates, affiliations, and publication details are accurate.

## Code standards

- Keep changes minimal and scoped.
- Follow existing project style and formatting.
- Do not commit generated artifacts unless explicitly required.

## Questions

If a change touches personal/profile content and intent is unclear, open an issue before implementing.
