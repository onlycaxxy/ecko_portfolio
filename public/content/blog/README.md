# How to Write and Publish Blog Posts

## File Structure

```
public/content/blog/
├── README.md (this file)
├── echo-principles.md (example post)
└── your-new-post.md (your posts go here)
```

## Step 1: Create a New Markdown File

Create a new file in `public/content/blog/` with a URL-friendly name:

```bash
# Example filename:
my-thoughts-on-design.md
building-ecko.md
reflection-march-2024.md
```

## Step 2: Write Your Post with Frontmatter

Every markdown file MUST start with frontmatter (metadata):

```markdown
---
title: "Your Post Title Here"
date: "2024-01-15"
excerpt: "A short 1-2 sentence preview that shows in the blog list"
image: "/placeholder.svg"
---

Your actual blog content starts here...

## You can use headings

Regular paragraphs work normally.

**Bold text** and *italic text* are supported.

> Blockquotes look like this

### Subheadings too

- Bullet points
- Work great
- For lists

1. Numbered lists
2. Also work
3. Perfectly
```

## Step 3: Add Post to Blog List

Open `client/pages/Blog.tsx` and add your post metadata:

```tsx
const blogPosts = [
  {
    slug: "my-thoughts-on-design",        // ← Must match filename (without .md)
    title: "My Thoughts on Design",
    excerpt: "A reflection on...",
    date: "2024-01-15",
    image: "/placeholder.svg"
  },
  // ... other posts
];
```

## Step 4: That's It!

Your post will automatically render at:
`http://localhost:8080/post/my-thoughts-on-design`

## Markdown Cheatsheet

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**bold text**
*italic text*

> Blockquote

[Link text](https://url.com)

![Image alt text](/path/to/image.jpg)

---
(horizontal line)
```

## Tips

- Keep filenames lowercase with dashes (no spaces)
- Write frontmatter exactly as shown (with three dashes)
- The `slug` in Blog.tsx must match the filename
- Date format: "YYYY-MM-DD"
- Test your post at http://localhost:8080/post/YOUR-SLUG
