# Contributing to CSV Graph Generator

[Japanese (日本語)](./CONTRIBUTING_ja.md)

Thank you for your interest in contributing to CSV Graph Generator! We welcome bug reports, feature requests, and pull requests.

---

## Development Workflow

This project operates as a **Docker-based GitHub Action**.
Because dependencies like `canvas` require native compilation, integration testing and graph generation verification are handled via GitHub Actions CI (Ubuntu / Docker).

### 1. Development & Branching Strategy (GitHub Flow)
1. **Open an Issue**:
   - Before starting, create an issue under [`docs/issues/`](docs/issues/) using the template [`docs/issues/TEMPLATE.md`](docs/issues/TEMPLATE.md).
2. **Create a Topic Branch**:
   - Create a branch named `<type>/<3-digit-id>-<summary>` (e.g., `feature/002-line-chart-options`).
   - Allowed types: `feature`, `fix`, `refactor`, `docs`, `chore`, `test`.
3. **Make Changes**:
   - Edit the TypeScript source code under `src/`.
4. **Commit & Push**:
   - Commit changes in small, logical units and push to your topic branch.
   - Note: Direct commits and direct pushes to `main` are blocked by Git Hooks.
5. **Create a Pull Request**:
   - Once a PR is opened, the GitHub Actions CI (`Test Action`) automatically builds the Dockerfile on Ubuntu and validates graph generation.
   - You do NOT need to build or commit `dist/` artifacts manually.

---

## Code Style & Quality

- We use **Prettier** for code formatting (`npm run format` / `npm run format-check`).
- We use **ESLint** for linting (`npm run lint`).
- We use **Jest** for unit testing (`npm test`).
- Ensure your changes pass format and lint checks before submitting a PR.

---

## Release Process

For the full release procedure, see [`RELEASE.md`](RELEASE.md).
Releases can be prepared smoothly using Antigravity's `prepare-release` skill.

---

## Reporting Issues

If you find a bug or have a feature request, please search existing issues first. If no similar issue exists, please open a new issue with a clear description.
