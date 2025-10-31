---
description: Document bug with Problem/Solution/Prevention for CLAUDE.md
---

When a bug is found, execute this workflow to document it in CLAUDE.md:

1. **Identify the bug context:**
   - What broke? (Observable symptoms)
   - When did it happen? (Date)
   - What was the root cause?

2. **Create case study following template:**
   ```
   ### [Bug Title] (YYYY-MM-DD)

   **Problem:**
   - [Observable symptom 1]
   - [Observable symptom 2]
   - [Root cause]

   **Solution:**
   - [Fix approach 1]
   - [Fix approach 2]
   - [Technical detail]

   **Prevention Principles:**
   1. [Actionable rule to avoid this class of bugs]
   2. [Pattern to check before implementing]
   3. [Testing/validation strategy]
   4-6. [Additional principles as needed]
   ```

3. **Add to CLAUDE.md:**
   - Insert under "Bug Review Workflow" section
   - Keep under 30 lines per case study
   - Make it modular and self-contained
   - Write for portfolio context but keep principles transferable

4. **Key constraints:**
   - Maximum 30 lines per case study
   - 2-3 bullet points for Problem
   - 2-3 bullet points for Solution
   - 3-6 Prevention Principles (actionable, specific)

5. **After adding:**
   - Confirm the case study is added
   - Summarize key prevention principles for user
   - Mark this as a learning moment for the codebase
