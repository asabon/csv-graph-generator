---
description: Initialize session by reading project rules
---

1. Check for the existence of `.agent/config.yml`.
2. If `.agent/config.yml` exists, read it to determine the user's preferred language (e.g., `language: "ja"`).
3. If the file does not exist, check config.yml.sample to understand the structure, but default to English (or system default) if no config is present.
// turbo
4. Read .antigravity.yml.
5. Summarize the key rules and preferences to the user.
   - If a language is configured in `config.yml`, provide the summary in that language AND explicitly state that you will conduct the rest of this session in that language.
   - If no configuration is found, use the default language.
