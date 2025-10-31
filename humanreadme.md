# workflow on /writing
1. Read `.writing/style_reference.md` to absorb voice patterns from
     archived posts
     2. Read `.writing/principles.md` for structural and tonal guidelines
     3. Read `.writing/brief.md` to check current topic ideas
     4. Ask user which topic from brief.md they want to develop, or if they
     want to add a new topic
     5. Once topic is selected, begin drafting according to the style
     patterns and principles
     6. After publishing, remind user to archive the post in
     style_reference.md with analysis

     ## Instructions

     - Start by reading all three files in parallel
     - Summarize what you learned from style_reference.md (voice patterns,
     themes, vocabulary)
     - Confirm which topic to develop from brief.md
     - Draft according to principles: humble authority, temporal
     self-dialogue, numbered poetic sections, circular structure
     - Maintain bilingual flow naturally
     - Apply voice signatures: embodied abstraction, micro-narratives,
     incompleteness as honesty
     How to Use

# Simply type: /write

  And I will:
  1. Read your style reference,
  principles, and brief files
  2. Absorb your voice patterns and
   structural preferences
  3. Ask which topic you want to
  develop
  4. Draft according to your
  established style
  
  
  
# file naming
- Blog Structure:
  - Blog.tsx (client/pages/Blog.tsx:1) - List view showing all blog posts with metadata
  - BlogPost.tsx (client/pages/BlogPost.tsx:1) - Individual post reader that fetches markdown files from /content/blog/

- Blog.tsx → Acts as an index/listing page
- BlogPost.tsx → Displays individual posts dynamically based on URL slug

- Home vs Welcome:
  - Home.tsx (client/pages/Home.tsx:1) - The Echo tool interface (main
  functional app)
  - Welcome.tsx (client/pages/Welcome.tsx:1) - Landing page with hero
  section and site navigation

  # image naming
  -Proposed File Naming Convention

  Best Practice Pattern:
  [content-type]-[slug/identifier].jpg

  Examples:
  blog-origin-story.jpg
  blog-echo-principles.jpg
  blog-introducing-hikki.jpg
  blog-introducing-echo.jpg
  translation-prologue.jpg
  translation-spring-postcard.jpg
  translation-fragments-may.jpg
  translation-fragments-june.jpg
  portrait.jpg

  Why this works:
  - Clear content type prefix (blog, translation, portrait)
  - Matches slug used in URLs
  - Easy to distinguish at a glance
  - Consistent with existing architecture