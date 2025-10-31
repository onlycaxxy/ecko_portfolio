# How to Update Your Portfolio Content
## Example User Requests

**Request:** "Add this blog post: [markdown content]"
**Claude does:**
1. Create `/public/content/blog/{slug}.md` with content
2. Add entry to top of `blogPosts` array in `Blog.tsx`
3. Reply: "Blog post published at `/post/{slug}`. Modified: `Blog.tsx:5`, created `{slug}.md`"

**Request:** "Add this translation: [content with EN/ZH sections]"
**Claude does:**
1. Create `/public/content/translations/{slug}.md`
2. Add entry to top of `translationItems` in `Portfolio.tsx`
3. Reply: "Translation published at `/translations/{slug}` and appears on Portfolio page. Modified: `Portfolio.tsx:2`, created `{slug}.md`"

**Request:** "Add images for blog posts and translations"
**Claude does:**
1. Use `/addimages` command
2. Move files following naming convention to appropriate directories
3. Update Blog.tsx and Portfolio.tsx with image paths
4. Reply: "Images added. Modified: `Blog.tsx`, `Portfolio.tsx`. Files moved to `/public/assets/images/`"

**Instructions for Claude Code**

This file documents the workflow for adding/updating content. The user will provide markdown files or text changes, and Claude executes the steps.

---

## Workflow 1: Add New Blog Post

**User provides:** Markdown file or content text + title/date/excerpt

**Claude's tasks:**

### Step 1: Create markdown file
- **Location:** `/public/content/blog/{slug}.md`
- **Slug:** Lowercase, hyphenated version of title (e.g., "My Post" → `my-post.md`)
- **Format:**
```markdown
---
title: "{User's title}"
date: "{YYYY-MM-DD}"
excerpt: "{User's excerpt or generate from first paragraph}"
---

{User's content}
```

### Step 2: Update Blog.tsx
- **File:** `client/pages/Blog.tsx`
- **Action:** Add new entry to `blogPosts` array at the TOP
- **Pattern:**
```tsx
const blogPosts = [
  {
    slug: "{filename without .md}",
    title: "{Same as markdown frontmatter}",
    excerpt: "{Same as markdown frontmatter}",
    date: "{YYYY-MM-DD}",
    image: "/placeholder.svg"
  },
  // ... existing posts
];
```

**Verification:** Tell user post is live at `/post/{slug}`

---

## Workflow 2: Add New Translation Piece

**User provides:** Markdown file with EN/ZH sections + metadata

**Claude's tasks:**

### Step 1: Create markdown file
- **Location:** `/public/content/translations/{slug}.md`
- **Slug:** Lowercase, hyphenated (e.g., "Fragment 200" → `fragment-200.md`)
- **Format:**
```markdown
---
title: "{Title}"
author: "{Original author if provided}"
translator: "Kishi"
date: "{YYYY-MM-DD}"
description: "{Brief description}"
---

## EN
{English content}

## ZH
{Chinese content}
```

### Step 2: Update Portfolio.tsx
- **File:** `client/pages/Portfolio.tsx`
- **Action:** Add to `translationItems` array at the TOP
- **Pattern:**
```tsx
const translationItems = [
  {
    id: {highest_id + 1},
    title: "{Same as markdown title}",
    note: "{Same as markdown description}",
    image: "placeholder",
    link: "/translations/{slug}"
  },
  // ... existing items
];
```

**Verification:** Tell user translation is live at `/translations/{slug}` and appears on Portfolio page under Translation Design section

---

## Workflow 3: Update Existing Text Content

**User provides:** "Change {specific text} to {new text} on {page name}"

**Claude's tasks:**

### Common files to edit:

| Page | File | What to change |
|------|------|----------------|
| Home (Echo tool) | `client/pages/Home.tsx` | Headings, descriptions, button text |
| Welcome (Landing) | `client/pages/Welcome.tsx` | Hero text, CTAs, site index |
| About | `client/pages/About.tsx` | About text (line 3: `aboutText`) |
| Blog listing | `client/pages/Blog.tsx` | Page title, description, blogPosts array |
| Portfolio | `client/pages/Portfolio.tsx` | Page title, description, translationItems array |

**Action:**
1. Use Edit tool to replace exact text
2. Preserve all HTML/JSX structure
3. Keep className attributes unchanged

**Verification:** Confirm change made at `{file}:{line_number}`

---

## Workflow 4: Add Images (Use `/addimages` command)

**User provides:** Location of image files

**File Naming Convention:** `[content-type]-[slug].jpg`
- Blog: `blog-origin-story.jpg`, `blog-introducing-hikki.jpg`
- Translation: `translation-prologue.jpg`, `translation-spring-postcard.jpg`
- Portrait: `portrait.jpg`

**Claude's automated tasks (via `/addimages` command):**

### For blog posts:
1. Move `blog-{slug}.jpg` to `/public/assets/images/blog/`
2. Update `client/pages/Blog.tsx` → `blogPosts` array:
   ```tsx
   {
     slug: "origin-story",
     image: "/assets/images/blog/blog-origin-story.jpg"
   }
   ```

### For translations:
1. Move `translation-{slug}.jpg` to `/public/assets/images/translations/`
2. Update `client/pages/Portfolio.tsx` → `translationItems` array:
   ```tsx
   {
     title: "Prologue",
     image: "/assets/images/translations/translation-prologue.jpg"
   }
   ```

### For portrait:
1. Move `portrait.jpg` to `/public/assets/images/`
2. Confirm `client/pages/About.tsx` line 2:
   ```tsx
   const portraitImage = "/assets/images/portrait.jpg";
   ```

**Verification:**
- Files moved to correct directories
- Code updated with image paths
- Summary provided with file/line references

---

## Key Rules for Claude

1. **Slugs:** Always lowercase, hyphenated, no spaces or special characters
2. **IDs:** Always increment from highest existing ID in the array (for translations only)
3. **Order:** Always add new items at the TOP of arrays (most recent first)
4. **Frontmatter:** Must match exactly between markdown file and .tsx listing
5. **Links:** Translation links are `/translations/{slug}`, blog post links are `/post/{slug}`
6. **Array names:** Use `blogPosts` in Blog.tsx, `translationItems` in Portfolio.tsx
7. **Image naming:** Follow `[content-type]-[slug].jpg` pattern (use `/addimages` command)
8. **Verification:** Always tell user where content is live and which files were modified with line numbers

## Current Structure Reference

**Blog posts (Read section):**
- Route: `/post/{slug}`
- Markdown: `/public/content/blog/{slug}.md`
- Code: `client/pages/Blog.tsx` → `blogPosts` array
- Images: `/public/assets/images/blog/blog-{slug}.jpg`

**Translations (Portfolio → Translation Design):**
- Route: `/translations/{slug}`
- Markdown: `/public/content/translations/{slug}.md`
- Code: `client/pages/Portfolio.tsx` → `translationItems` array
- Images: `/public/assets/images/translations/translation-{slug}.jpg`

**Portrait (About page):**
- Image: `/public/assets/images/portrait.jpg`
- Code: `client/pages/About.tsx` line 2

---

**Last Updated:** 2025-10-23
