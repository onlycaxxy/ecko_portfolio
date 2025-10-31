# How to Add Images to Your Portfolio

## File Naming Convention

**Pattern:** `[content-type]-[slug].jpg`

Examples:
- Blog posts: `blog-origin-story.jpg`, `blog-introducing-hikki.jpg`
- Translations: `translation-prologue.jpg`, `translation-spring-postcard.jpg`
- Portrait: `portrait.jpg`

## Quick Reference

```
/public/assets/images/
  ├── portrait.jpg          → Your About page portrait
  ├── blog/
  │   ├── blog-origin-story.jpg
  │   ├── blog-introducing-echo.jpg
  │   ├── blog-introducing-hikki.jpg
  │   ├── blog-echo-principles.jpg
  │   └── blog-between-drift-and-destruction.jpg
  └── translations/
      ├── translation-prologue.jpg
      ├── translation-spring-postcard.jpg
      ├── translation-fragments-may.jpg
      └── translation-fragments-june.jpg
```

---

## Step-by-Step Instructions

### 1. Add Blog Post Images

**Where to put files:**
- Drop your images in `/public/assets/images/blog/`
- Naming: `blog-[slug].jpg` (matches the URL slug)
- Supported formats: `.jpg`, `.png`, `.webp`

**Update the code:**

Open `client/pages/Blog.tsx` and change:

```tsx
// FROM:
{
  slug: "introducing-echo",
  title: "Introducing Echo",
  excerpt: "A quiet space for deep thinking and reflection",
  date: "2025-01-15",
  image: "/placeholder.svg"  // ← Change this
}

// TO:
{
  slug: "introducing-echo",
  title: "Introducing Echo",
  excerpt: "A quiet space for deep thinking and reflection",
  date: "2025-01-15",
  image: "/assets/images/blog/blog-introducing-echo.jpg"  // ← Use your filename
}
```

Repeat for all blog posts in the blogPosts array.

---

### 2. Add Translation Images

**Where to put files:**
- Drop your images in `/public/assets/images/translations/`
- Naming: `translation-[slug].jpg` (e.g., `translation-prologue.jpg`)

**Update the code:**

Open `client/pages/Portfolio.tsx` and change the `translationItems` array:

```tsx
// FROM:
{
  id: 7,
  title: "Prologue",
  note: "Early fragments and reflections on responsible creation",
  image: "placeholder",  // ← Change this
  link: "/translations/prologue"
}

// TO:
{
  id: 7,
  title: "Prologue",
  note: "Early fragments and reflections on responsible creation",
  image: "/assets/images/translations/translation-prologue.jpg",  // ← Use your filename
  link: "/translations/prologue"
}
```

Repeat for all 4 translation items.

---

### 3. Add Your Portrait (About Page)

**Where to put file:**
- Drop your portrait in `/public/assets/images/portrait.jpg`

**Update the code:**

Open `client/pages/About.tsx` and change line 2:

```tsx
// FROM:
const portraitImage = "/assets/images/portrait.jpg";

// TO (if you want different filename):
const portraitImage = "/assets/images/your-photo-name.jpg";

// OR to hide portrait and show placeholder:
const portraitImage = "placeholder";
```

---

## Image Recommendations

**Size:**
- Portfolio cards: 800x600px minimum (4:3 aspect ratio)
- Literary work cards: 800x600px minimum (4:3 aspect ratio)
- Portrait: 600x800px minimum (3:4 aspect ratio)

**Format:**
- `.jpg` for photos
- `.png` for graphics with transparency
- `.webp` for smallest file size (modern browsers only)

**File size:**
- Keep under 500KB per image for fast loading
- Use online compressors like TinyPNG if needed

---


---

## Troubleshooting

**Image not showing?**
- Check filename matches exactly (case-sensitive)
- Make sure image is in correct folder under `/public/assets/images/`
- Verify path starts with `/assets/` not `/public/assets/`
- Refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)

**Image looks distorted?**
- Use recommended aspect ratios (4:3 for cards, 3:4 for portrait)
- Or crop images before uploading

**Still showing placeholder?**
- Make sure you changed `image: "placeholder"` to the actual path
- Save the file and wait for dev server to reload

---

