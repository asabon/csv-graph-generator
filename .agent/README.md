# .agent Directory

This directory is dedicated to **Antigravity** (the AI Agent) and contains configuration files and workflow definitions used to assist with development.

## Structure

- **workflows/**: Contains markdown files defining specific workflows (e.g., `/init`, `/resume`). The AI agent reads these files to execute predefined sequences of tasks.
- **config.yml**: User-specific configuration file (e.g., language settings). This file is **ignored by git** (`.gitignore`) to allow each developer to have their own preferences.
- **config.yml.sample**: A sample configuration file. Copy this to `config.yml` to set up your personal preferences.

## Usage

This directory is primarily used by the AI agent to understand project-specific rules, workflows, and user preferences. It does not typically affect standard build tools or other development utilities unless explicitly configured to do so.

## Policy for `.work` Directory

The `.work` directory is designated as a scratchpad/working area for Antigravity.
- It is included in `.gitignore` to prevent generated files from polluting the repository.
- **Write Access**: Since `write_to_file` is blocked by `.gitignore`, Antigravity must use `run_command` to write files to this directory.
- **Safety**: `run_command` for file writing should be **strictly limited** to the `.work` directory to ensure safety. Writing to other directories should be done via standard tools (`write_to_file`).
