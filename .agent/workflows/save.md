---
description: Save current progress to a timestamped file
---

// turbo
1. Get the current date and time in `YYYYMMDD_HHMM` format.
2. Create a summary of the current session (completed tasks, current status, next steps).
3. Save the summary to `.work/progress_<TIMESTAMP>.md` using the `run_command` tool (as `.work` is git-ignored and write_to_file is blocked).
   Example: `echo "content" > .work/progress_<TIMESTAMP>.md`
4. Report to the user that the save is complete.
