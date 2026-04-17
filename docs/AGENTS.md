# AGENTS.md

Repository guidance for Codex and future agents working in this project.

## Commit Discipline

- Do not batch unrelated work into one large commit.
- Never collapse a multi-step task into a single commit when the work can be split into separate coherent units.
- Prefer small, focused commits that each represent one coherent change.
- Split implementation into multiple commits when the work naturally has separate steps, for example:
  - refactor foundation
  - feature UI
  - Gemini integration
  - bug fix
  - tests or cleanup
- If a user asks for commit and push, first inspect the diff and actively create multiple commits when the task spans backend, frontend, tests, docs, or other separable scopes.
- Each commit message must match the actual scope of the change.
- Use semantic, context-aware commit messages. Examples:
  - `feat: add daily lesson tab`
  - `refactor: replace weekly tracker with date-based tracker`
  - `fix: validate Gemini daily lesson payload before caching`
  - `docs: add repository agent workflow rules`
- Do not use vague commit messages such as `update`, `fix stuff`, `changes`, or `final`.
- Before committing, verify the staged diff is consistent with the commit message.
- After finishing a coherent set of commits, push the branch so remote history stays in sync.

## Working Rule

- If a task contains multiple independent changes, commit them separately in semantic order instead of waiting to commit everything at the end.

## Task Startup Rule

- Before starting any task in this repository, read this file first.
- If there is another `AGENTS.md` in the repository, use this file as the canonical source unless that file explicitly overrides a local area.
- Do not start implementation based only on assumptions when repository-specific guidance can be recorded here.

## Knowledge Capture

- When new repository-specific knowledge is discovered during a task, add it to this file if it is likely to help future work.
- Capture only durable knowledge, for example workflow rules, architecture decisions, naming rules, integration caveats, or recurring gotchas.
- Do not add temporary notes, one-off debugging logs, or task-specific status updates.
- Update this file in the same task when the new knowledge becomes clear, instead of postponing documentation.

## Architecture Notes

- Daily lesson generation is now server-side through `GET /api/daily-lesson?date=YYYY-MM-DD`.
- Shared daily cache is persisted in Vercel Blob private storage when `BLOB_READ_WRITE_TOKEN` is present.
- For local development and tests without Blob, the backend falls back to filesystem storage. Override its location with `DAILY_LESSON_CACHE_DIR` when needed.
- `GEMINI_API_KEY` is a server runtime environment variable. Do not reintroduce browser-side Gemini key flow for the main daily lesson path.
- Cache concurrency is guarded by a per-date lock in the backend so the same date is generated once and then reused.
