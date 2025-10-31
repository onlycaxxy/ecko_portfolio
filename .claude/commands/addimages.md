---
description: Add images to blog posts, translations, or portrait with automated placement
---

Execute automated image placement workflow based on HOW_TO_ADD_IMAGES.md:

**File Naming Convention:** `[content-type]-[slug].jpg`
- Blog: `blog-origin-story.jpg`, `blog-introducing-hikki.jpg`
- Translation: `translation-prologue.jpg`, `translation-spring-postcard.jpg`
- Portrait: `portrait.jpg`

**Workflow Steps:**

1. **Ask user for image location:**
   - "Where are your image files located?" (e.g., Desktop/images/, Downloads/)
   - User provides absolute path or directory name

2. **Scan and identify files:**
   - List all `.jpg`, `.png`, `.webp` files in provided location
   - Parse filenames to determine type:
     - `blog-*.jpg` → Blog post image
     - `translation-*.jpg` → Translation image
     - `portrait.jpg` → Portrait image
   - Show user what was found and where each will go

3. **Present plan (following CLAUDE.md approval workflow):**
   ```
   Found X images:
   - blog-origin-story.jpg → /public/assets/images/blog/
   - translation-prologue.jpg → /public/assets/images/translations/
   - portrait.jpg → /public/assets/images/

   Will update:
   - Blog.tsx (X posts)
   - Portfolio.tsx (X translations)
   - About.tsx (if portrait found)

   Ready to proceed?
   ```

4. **After approval, execute:**
   - Move files to destinations:
     - `blog-*.jpg` → `/public/assets/images/blog/`
     - `translation-*.jpg` → `/public/assets/images/translations/`
     - `portrait.jpg` → `/public/assets/images/`

   - Update code:
     - **Blog.tsx**: Match slug, update `image: "/assets/images/blog/blog-{slug}.jpg"`
     - **Portfolio.tsx**: Match title/slug, update `image: "/assets/images/translations/translation-{slug}.jpg"`
     - **About.tsx**: Confirm `portraitImage` path is correct

5. **Verification summary:**
   - List all files moved
   - Show which files were updated with line numbers
   - Remind user to refresh browser

**Key constraints:**
- Maximum 50 lines of code changes per iteration (CLAUDE.md)
- If more than 5 images, break into phases
- Always show plan before executing
- Follow automation guidelines: explain → plan → approve → implement
