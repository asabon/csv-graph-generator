# Contributing to CSV Graph Generator

[Japanese (日本語)](./CONTRIBUTING_ja.md)

Thank you for your interest in contributing to CSV Graph Generator! We welcome bug reports, feature requests, and pull requests.

## Development Workflow

This project uses a specific workflow for building the TypeScript action, designed to handle dependencies that require native compilation (like `canvas`).

### Important: Do Not Build Locally

Since `canvas` dependencies can be difficult to set up on some environments (especially Windows), **we do not require or recommend building the project locally.**

Instead, we have a CI workflow setup that automatically builds the project and commits the artifacts (`dist/` folder) whenever you push changes to a feature branch.

1.  **Create a Branch**: Create a new branch for your feature or fix (e.g., `feature/add-pie-chart`).
2.  **Make Changes**: Edit the TypeScript source code in `src/`.
3.  **Push**: Commit and push your changes to GitHub.
    ```bash
    git push origin feature/add-pie-chart
    ```
4.  **Auto-Build**: The GitHub Actions workflow will automatically run, install dependencies, build the project, and commit the generated `dist/index.js` back to your branch.
5.  **Pull**: Pull the changes (including the built artifacts) back to your local machine before making further edits.
    ```bash
    git pull origin feature/add-pie-chart
    ```

### Release Process

1.  Update the version in `package.json`.
2.  Create a new Release on GitHub.
3.  Publish to the GitHub Marketplace (automatic upon valid release).

## Code Style

*   We use **Prettier** for code formatting.
*   We use **ESLint** for linting.
*   Please ensure your code follows these standards. The CI workflow will also check for format and lint errors.

## Reporting Issues

If you find a bug or have a feature request, please search existing issues first. If no similar issue exists, please open a new issue with a clear description.
